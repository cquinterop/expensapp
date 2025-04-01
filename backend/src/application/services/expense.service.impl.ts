import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import {
	ExpenseService,
	CreateRegularExpenseDto,
	CreateTravelExpenseDto,
	CreateMileageExpenseDto,
} from '@/domain/services/expense.service';
import { Expense, ExpenseStatus, ExpenseType } from '@/domain/entities/expense.entity';
import { RegularExpense } from '@/domain/entities/regular-expense.entity';
import { TravelExpense, TravelSubtype } from '@/domain/entities/travel-expense.entity';
import { AccommodationDetail } from '@/domain/entities/accommodation-detail.entity';
import { TransportationDetail } from '@/domain/entities/transportation-detail.entity';
import { MileageExpense } from '@/domain/entities/mileage-expense.entity';
import { ExpenseRepository, ExpenseFilters } from '@/domain/repositories/expense.repository';
import { RegularExpenseRepository } from '@/domain/repositories/regular-expense.repository';
import { TravelExpenseRepository } from '@/domain/repositories/travel-expense.repository';
import { AccommodationDetailRepository } from '@/domain/repositories/accommodation-detail.repository';
import { TransportationDetailRepository } from '@/domain/repositories/transportation-detail.repository';
import { MileageExpenseRepository } from '@/domain/repositories/mileage-expense.repository';
import { TenantRepository } from '@/domain/repositories/tenant.repository';
import { UserRepository } from '@/domain/repositories/user.repository';
import { MileageRateService } from '@/domain/services/mileage-rate.service';
import { TYPES } from '@/infrastructure/config/types';

@injectable()
export class ExpenseServiceImpl implements ExpenseService {
	constructor(
		@inject(TYPES.ExpenseRepository) private readonly expenseRepository: ExpenseRepository,
		@inject(TYPES.RegularExpenseRepository)
		private readonly regularExpenseRepository: RegularExpenseRepository,
		@inject(TYPES.TravelExpenseRepository)
		private readonly travelExpenseRepository: TravelExpenseRepository,
		@inject(TYPES.AccommodationDetailRepository)
		private readonly accommodationDetailRepository: AccommodationDetailRepository,
		@inject(TYPES.TransportationDetailRepository)
		private readonly transportationDetailRepository: TransportationDetailRepository,
		@inject(TYPES.MileageExpenseRepository)
		private readonly mileageExpenseRepository: MileageExpenseRepository,
		@inject(TYPES.TenantRepository) private readonly tenantRepository: TenantRepository,
		@inject(TYPES.UserRepository) private readonly userRepository: UserRepository,
		@inject(TYPES.MileageRateService) private readonly mileageRateService: MileageRateService,
	) {}

	async createRegularExpense(data: CreateRegularExpenseDto): Promise<Expense> {
		// Create base expense
		const expense = new Expense(
			uuidv4(),
			data.tenantId,
			data.userId,
			data.amount,
			data.description,
			ExpenseType.REGULAR,
		);

		const createdExpense = await this.expenseRepository.create(expense);

		// Create regular expense details
		const regularExpense = new RegularExpense(uuidv4(), createdExpense.id, data.receiptUrl);

		await this.regularExpenseRepository.create(regularExpense);

		return createdExpense;
	}

	async createTravelExpense(data: CreateTravelExpenseDto): Promise<Expense> {
		// Create base expense
		const expense = new Expense(
			uuidv4(),
			data.tenantId,
			data.userId,
			data.amount,
			data.description,
			ExpenseType.TRAVEL,
		);

		const createdExpense = await this.expenseRepository.create(expense);

		// Create travel expense details
		const travelExpense = new TravelExpense(
			uuidv4(),
			createdExpense.id,
			data.travelSubtype as TravelSubtype,
			new Date(data.startDate),
			new Date(data.endDate),
		);

		const createdTravelExpense = await this.travelExpenseRepository.create(travelExpense);

		// Create subtype-specific details
		if (
			data.travelSubtype === TravelSubtype.ACCOMMODATION &&
			data.hotelName &&
			data.checkInDate &&
			data.checkOutDate
		) {
			const accommodationDetail = new AccommodationDetail(
				uuidv4(),
				createdTravelExpense.id,
				data.hotelName,
				new Date(data.checkInDate),
				new Date(data.checkOutDate),
			);

			await this.accommodationDetailRepository.create(accommodationDetail);
		} else if (
			data.travelSubtype === TravelSubtype.TRANSPORTATION &&
			data.transportationMode &&
			data.route
		) {
			const transportationDetail = new TransportationDetail(
				uuidv4(),
				createdTravelExpense.id,
				data.transportationMode,
				data.route,
			);

			await this.transportationDetailRepository.create(transportationDetail);
		}

		return createdExpense;
	}

	async createMileageExpense(data: CreateMileageExpenseDto): Promise<Expense> {
		// Get mileage rate if not provided
		const ratePerKm =
			data.ratePerKm || (await this.mileageRateService.getCurrentMileageRate(data.tenantId));

		// Calculate amount
		const amount = data.distanceKm * ratePerKm;

		// Create base expense
		const expense = new Expense(
			uuidv4(),
			data.tenantId,
			data.userId,
			amount,
			data.description,
			ExpenseType.MILEAGE,
		);

		const createdExpense = await this.expenseRepository.create(expense);

		// Create mileage expense details
		const mileageExpense = new MileageExpense(
			uuidv4(),
			createdExpense.id,
			data.distanceKm,
			ratePerKm,
		);

		await this.mileageExpenseRepository.create(mileageExpense);

		return createdExpense;
	}

	async getExpenseById(id: string): Promise<Expense> {
		const expense = await this.expenseRepository.findById(id);
		if (!expense) {
			throw new Error('Expense not found');
		}
		return expense;
	}

	async getExpenses(filters: ExpenseFilters): Promise<{ expenses: Expense[]; total: number }> {
		const expenses = await this.expenseRepository.findByFilters(filters);

		return expenses;
	}

	async updateExpense(id: string, data: Partial<Expense>): Promise<Expense> {
		const expense = await this.expenseRepository.findById(id);
		if (!expense) {
			throw new Error('Expense not found');
		}

		// Only allow updates if expense is pending
		if (expense.status !== ExpenseStatus.PENDING) {
			throw new Error('Only pending expenses can be updated');
		}

		// Update expense
		Object.assign(expense, data);
		expense.updatedAt = new Date();

		return this.expenseRepository.update(expense);
	}

	async deleteExpense(id: string): Promise<boolean> {
		const expense = await this.expenseRepository.findById(id);
		if (!expense) {
			throw new Error('Expense not found');
		}

		// Only allow deletion if expense is pending
		if (expense.status !== ExpenseStatus.PENDING) {
			throw new Error('Only pending expenses can be deleted');
		}

		return this.expenseRepository.delete(id);
	}

	async approveExpense(id: string, adminId: string): Promise<Expense> {
		const expense = await this.expenseRepository.findById(id);
		if (!expense) {
			throw new Error('Expense not found');
		}

		// Get admin user
		const admin = await this.userRepository.findById(adminId);
		if (!admin) {
			throw new Error('Admin user not found');
		}

		// Check if admin belongs to the same tenant
		if (admin.tenantId !== expense.tenantId) {
			throw new Error('Admin cannot approve expenses from different tenant');
		}

		// Check if user is admin
		if (!admin.isAdmin) {
			throw new Error('Only admins can approve expenses');
		}

		// Approve expense
		expense.approve(adminId);

		// Update tenant balance
		// await this.tenantRepository.updateBalanceWithLock(expense.tenantId, -expense.amount);

		return this.expenseRepository.update(expense);
	}

	async rejectExpense(id: string, adminId: string): Promise<Expense> {
		const expense = await this.expenseRepository.findById(id);
		if (!expense) {
			throw new Error('Expense not found');
		}

		// Get admin user
		const admin = await this.userRepository.findById(adminId);
		if (!admin) {
			throw new Error('Admin user not found');
		}

		// Check if admin belongs to the same tenant
		if (admin.tenantId !== expense.tenantId) {
			throw new Error('Admin cannot reject expenses from different tenant');
		}

		// Check if user is admin
		if (!admin.isAdmin) {
			throw new Error('Only admins can reject expenses');
		}

		// Reject expense
		expense.reject(adminId);

		return this.expenseRepository.update(expense);
	}
}

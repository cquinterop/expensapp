import { Expense } from '@/domain/entities/expense.entity';
import { ExpenseFilters } from '@/domain/repositories/expense.repository';

export interface CreateRegularExpenseDto {
	tenantId: string;
	userId: string;
	description: string;
	amount: number;
	receiptUrl: string;
}

export interface CreateTravelExpenseDto {
	tenantId: string;
	userId: string;
	description: string;
	amount: number;
	travelSubtype: string;
	hotelName?: string;
	checkInDate?: Date;
	checkOutDate?: Date;
	transportationMode?: string;
	route?: string;
}

export interface CreateMileageExpenseDto {
	tenantId: string;
	userId: string;
	description: string;
	distanceKm: number;
	ratePerKm?: number;
}

export interface ExpenseService {
	createRegularExpense(data: CreateRegularExpenseDto): Promise<Expense>;
	createTravelExpense(data: CreateTravelExpenseDto): Promise<Expense>;
	createMileageExpense(data: CreateMileageExpenseDto): Promise<Expense>;
	getExpenseById(id: string): Promise<Expense>;
	getExpenses(filters: ExpenseFilters): Promise<{ expenses: Expense[]; total: number }>;
	updateExpense(id: string, data: Partial<Expense>): Promise<Expense>;
	deleteExpense(id: string): Promise<boolean>;
	approveExpense(id: string, adminId: string): Promise<Expense>;
	rejectExpense(id: string, adminId: string): Promise<Expense>;
}

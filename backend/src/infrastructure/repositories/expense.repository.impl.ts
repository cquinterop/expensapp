import { injectable } from 'inversify';
import { Op } from 'sequelize';
import type { ExpenseRepository, ExpenseFilters } from '@/domain/repositories/expense.repository';
import { Expense, type ExpenseStatus, type ExpenseType } from '@/domain/entities/expense.entity';
import { ExpenseModel } from '@/infrastructure/database/models/expense.model';
import { UserModel } from '@/infrastructure/database/models/user.model';

@injectable()
export class ExpenseRepositoryImpl implements ExpenseRepository {
	async findById(id: string): Promise<Expense | null> {
		const expenseModel = await ExpenseModel.findByPk(id, {
			include: [{ model: UserModel, attributes: ['fullName'] }],
		});
		if (!expenseModel) {
			return null;
		}

		return this.mapModelToEntity(expenseModel);
	}

	async findByFilters(filters: ExpenseFilters): Promise<{ expenses: Expense[]; total: number }> {
		const where: any = {};

		// Apply tenant filter
		if (filters.tenantId) {
			where.tenantId = filters.tenantId;
		}

		// Apply user filter
		if (filters.userId) {
			where.userId = filters.userId;
		}

		// Apply status filter
		if (filters.status) {
			where.status = filters.status;
		}

		// Apply date range filters
		if (filters.startDate || filters.endDate) {
			where.submittedAt = {};

			if (filters.startDate) {
				where.submittedAt[Op.gte] = filters.startDate;
			}

			if (filters.endDate) {
				where.submittedAt[Op.lte] = filters.endDate;
			}
		}

		// Calculate pagination
		const page = filters.page || 1;
		const limit = filters.limit || 10;
		const offset = (page - 1) * limit;

		// Execute query
		const { rows, count } = await ExpenseModel.findAndCountAll({
			where,
			include: [{ model: UserModel, attributes: ['fullName'] }],
			limit,
			offset,
			order: [['submittedAt', 'DESC']],
		});

		return {
			expenses: rows.map(this.mapModelToEntity),
			total: count,
		};
	}

	async create(expense: Expense): Promise<Expense> {
		const expenseModel = await ExpenseModel.create({
			id: expense.id,
			tenantId: expense.tenantId,
			userId: expense.userId,
			amount: expense.amount,
			description: expense.description,
			expenseType: expense.expenseType,
			status: expense.status,
			submittedAt: expense.submittedAt,
			processedAt: expense.processedAt,
			processedBy: expense.processedBy,
			createdAt: expense.createdAt,
			updatedAt: expense.updatedAt,
		});

		return this.mapModelToEntity(expenseModel);
	}

	async update(expense: Expense): Promise<Expense> {
		const expenseModel = await ExpenseModel.findByPk(expense.id);
		if (!expenseModel) {
			throw new Error('Expense not found');
		}

		await expenseModel.update({
			amount: expense.amount,
			description: expense.description,
			status: expense.status,
			processedAt: expense.processedAt,
			processedBy: expense.processedBy,
			updatedAt: new Date(),
		});

		return this.mapModelToEntity(expenseModel);
	}

	async delete(id: string): Promise<boolean> {
		const expenseModel = await ExpenseModel.findByPk(id);
		if (!expenseModel) {
			return false;
		}

		await expenseModel.destroy();
		return true;
	}

	private mapModelToEntity(model: ExpenseModel): Expense {
		const expense = new Expense(
			model.id,
			model.tenantId,
			model.userId,
			Number.parseFloat(model.amount.toString()),
			model.description,
			model.expenseType as ExpenseType,
			model.status as ExpenseStatus,
			model.submittedAt,
		);

		expense.processedAt = model.processedAt || undefined;
		expense.processedBy = model.processedBy || undefined;
		expense.createdAt = model.createdAt;
		expense.updatedAt = model.updatedAt;

		return expense;
	}
}

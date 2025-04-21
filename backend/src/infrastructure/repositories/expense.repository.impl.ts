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

	async findByFilters(
		filters: Partial<ExpenseFilters>,
	): Promise<{ expenses: Expense[]; total: number }> {
		const page = filters.page || 1;
		const limit = filters.limit || 10;
		const offset = (page - 1) * limit;
		const where = {
			...(filters.tenantId && { tenantId: filters.tenantId }),
			...(filters.userId && { userId: filters.userId }),
			...(filters.status && { status: filters.status }),
			...(filters.startDate || filters.endDate
				? {
						submittedAt: {
							...(filters.startDate && { [Op.gte]: filters.startDate }),
							...(filters.endDate && { [Op.lte]: filters.endDate }),
						},
					}
				: {}),
		};

		const { rows, count } = await ExpenseModel.findAndCountAll({
			where,
			include: [{ model: UserModel, as: 'user', attributes: ['fullName'] }],
			limit,
			offset,
			order: [['submittedAt', 'DESC']],
		});

		return {
			expenses: rows.map(this.mapModelToEntity),
			total: count,
		};
	}

	async create(expense: Expense) {
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

	async update(expense: Expense) {
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

	async delete(id: string) {
		const expenseModel = await ExpenseModel.findByPk(id);
		if (!expenseModel) {
			return false;
		}

		await expenseModel.destroy();
		return true;
	}

	private mapModelToEntity(model: ExpenseModel) {
		const expense = new Expense(
			model.id,
			model.tenantId,
			model.userId,
			Number.parseFloat(model.amount.toString()),
			model.description,
			model.expenseType as ExpenseType,
			model.status as ExpenseStatus,
			model.submittedAt,
			model.user?.fullName,
		);

		expense.processedAt = model.processedAt || undefined;
		expense.processedBy = model.processedBy || undefined;
		expense.createdAt = model.createdAt;
		expense.updatedAt = model.updatedAt;

		return expense;
	}
}

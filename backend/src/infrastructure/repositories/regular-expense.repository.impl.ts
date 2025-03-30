import { injectable } from 'inversify';
import type { RegularExpenseRepository } from '@/domain/repositories/regular-expense.repository';
import { RegularExpense } from '@/domain/entities/regular-expense.entity';
import { RegularExpenseModel } from '@/infrastructure/database/models/regular-expense.model';

@injectable()
export class RegularExpenseRepositoryImpl implements RegularExpenseRepository {
	async findByExpenseId(expenseId: string): Promise<RegularExpense | null> {
		const regularExpenseModel = await RegularExpenseModel.findOne({ where: { expenseId } });
		if (!regularExpenseModel) {
			return null;
		}

		return this.mapModelToEntity(regularExpenseModel);
	}

	async create(regularExpense: RegularExpense): Promise<RegularExpense> {
		const regularExpenseModel = await RegularExpenseModel.create({
			id: regularExpense.id,
			expenseId: regularExpense.expenseId,
			receiptUrl: regularExpense.receiptUrl,
			createdAt: regularExpense.createdAt,
			updatedAt: regularExpense.updatedAt,
		});

		return this.mapModelToEntity(regularExpenseModel);
	}

	async update(regularExpense: RegularExpense): Promise<RegularExpense> {
		const regularExpenseModel = await RegularExpenseModel.findByPk(regularExpense.id);
		if (!regularExpenseModel) {
			throw new Error('Regular expense not found');
		}

		await regularExpenseModel.update({
			receiptUrl: regularExpense.receiptUrl,
			updatedAt: new Date(),
		});

		return this.mapModelToEntity(regularExpenseModel);
	}

	async delete(id: string): Promise<boolean> {
		const regularExpenseModel = await RegularExpenseModel.findByPk(id);
		if (!regularExpenseModel) {
			return false;
		}

		await regularExpenseModel.destroy();
		return true;
	}

	private mapModelToEntity(model: RegularExpenseModel): RegularExpense {
		const regularExpense = new RegularExpense(model.id, model.expenseId, model.receiptUrl);
		regularExpense.createdAt = model.createdAt;
		regularExpense.updatedAt = model.updatedAt;
		return regularExpense;
	}
}

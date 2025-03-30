import { injectable } from 'inversify';
import type { TravelExpenseRepository } from '@/domain/repositories/travel-expense.repository';
import { TravelExpense, type TravelSubtype } from '@/domain/entities/travel-expense.entity';
import { TravelExpenseModel } from '@/infrastructure/database/models/travel-expense.model';

@injectable()
export class TravelExpenseRepositoryImpl implements TravelExpenseRepository {
	async findByExpenseId(expenseId: string): Promise<TravelExpense | null> {
		const travelExpenseModel = await TravelExpenseModel.findOne({ where: { expenseId } });
		if (!travelExpenseModel) {
			return null;
		}

		return this.mapModelToEntity(travelExpenseModel);
	}

	async create(travelExpense: TravelExpense): Promise<TravelExpense> {
		const travelExpenseModel = await TravelExpenseModel.create({
			id: travelExpense.id,
			expenseId: travelExpense.expenseId,
			travelSubtype: travelExpense.travelSubtype,
			startDate: travelExpense.startDate,
			endDate: travelExpense.endDate,
			createdAt: travelExpense.createdAt,
			updatedAt: travelExpense.updatedAt,
		});

		return this.mapModelToEntity(travelExpenseModel);
	}

	async update(travelExpense: TravelExpense): Promise<TravelExpense> {
		const travelExpenseModel = await TravelExpenseModel.findByPk(travelExpense.id);
		if (!travelExpenseModel) {
			throw new Error('Travel expense not found');
		}

		await travelExpenseModel.update({
			travelSubtype: travelExpense.travelSubtype,
			startDate: travelExpense.startDate,
			endDate: travelExpense.endDate,
			updatedAt: new Date(),
		});

		return this.mapModelToEntity(travelExpenseModel);
	}

	async delete(id: string): Promise<boolean> {
		const travelExpenseModel = await TravelExpenseModel.findByPk(id);
		if (!travelExpenseModel) {
			return false;
		}

		await travelExpenseModel.destroy();
		return true;
	}

	private mapModelToEntity(model: TravelExpenseModel): TravelExpense {
		const travelExpense = new TravelExpense(
			model.id,
			model.expenseId,
			model.travelSubtype as TravelSubtype,
			model.startDate,
			model.endDate,
		);
		travelExpense.createdAt = model.createdAt;
		travelExpense.updatedAt = model.updatedAt;
		return travelExpense;
	}
}

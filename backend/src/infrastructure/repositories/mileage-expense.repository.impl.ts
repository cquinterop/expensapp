import { injectable } from 'inversify';
import type { MileageExpenseRepository } from '@/domain/repositories/mileage-expense.repository';
import { MileageExpense } from '@/domain/entities/mileage-expense.entity';
import { MileageExpenseModel } from '@/infrastructure/database/models/mileage-expense.model';

@injectable()
export class MileageExpenseRepositoryImpl implements MileageExpenseRepository {
	async findByExpenseId(expenseId: string): Promise<MileageExpense | null> {
		const mileageExpenseModel = await MileageExpenseModel.findOne({ where: { expenseId } });
		if (!mileageExpenseModel) {
			return null;
		}

		return this.mapModelToEntity(mileageExpenseModel);
	}

	async create(mileageExpense: MileageExpense): Promise<MileageExpense> {
		const mileageExpenseModel = await MileageExpenseModel.create({
			id: mileageExpense.id,
			expenseId: mileageExpense.expenseId,
			distanceKm: mileageExpense.distanceKm,
			ratePerKm: mileageExpense.ratePerKm,
			createdAt: mileageExpense.createdAt,
			updatedAt: mileageExpense.updatedAt,
		});

		return this.mapModelToEntity(mileageExpenseModel);
	}

	async update(mileageExpense: MileageExpense): Promise<MileageExpense> {
		const mileageExpenseModel = await MileageExpenseModel.findByPk(mileageExpense.id);
		if (!mileageExpenseModel) {
			throw new Error('Mileage expense not found');
		}

		await mileageExpenseModel.update({
			distanceKm: mileageExpense.distanceKm,
			ratePerKm: mileageExpense.ratePerKm,
			updatedAt: new Date(),
		});

		return this.mapModelToEntity(mileageExpenseModel);
	}

	async delete(id: string): Promise<boolean> {
		const mileageExpenseModel = await MileageExpenseModel.findByPk(id);
		if (!mileageExpenseModel) {
			return false;
		}

		await mileageExpenseModel.destroy();
		return true;
	}

	private mapModelToEntity(model: MileageExpenseModel): MileageExpense {
		const mileageExpense = new MileageExpense(
			model.id,
			model.expenseId,
			Number.parseFloat(model.distanceKm.toString()),
			Number.parseFloat(model.ratePerKm.toString()),
		);
		mileageExpense.createdAt = model.createdAt;
		mileageExpense.updatedAt = model.updatedAt;
		return mileageExpense;
	}
}

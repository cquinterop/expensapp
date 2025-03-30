import { Entity } from '@/domain/entities/base.entity';

export class MileageExpense extends Entity {
	expenseId: string;
	distanceKm: number;
	ratePerKm: number;

	constructor(id: string, expenseId: string, distanceKm: number, ratePerKm: number) {
		super(id);
		this.expenseId = expenseId;
		this.distanceKm = distanceKm;
		this.ratePerKm = ratePerKm;

		if (distanceKm <= 0) {
			throw new Error('Distance must be greater than 0');
		}

		if (ratePerKm <= 0) {
			throw new Error('Rate per km must be greater than 0');
		}
	}

	calculateAmount(): number {
		return this.distanceKm * this.ratePerKm;
	}
}

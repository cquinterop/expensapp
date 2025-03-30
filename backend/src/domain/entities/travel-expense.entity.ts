import { Entity } from '@/domain/entities/base.entity';

export enum TravelSubtype {
	ACCOMMODATION = 'accommodation',
	TRANSPORTATION = 'transportation',
	OTHER = 'other',
}

export class TravelExpense extends Entity {
	expenseId: string;
	travelSubtype: TravelSubtype;
	startDate: Date;
	endDate: Date;

	constructor(
		id: string,
		expenseId: string,
		travelSubtype: TravelSubtype,
		startDate: Date,
		endDate: Date,
	) {
		super(id);
		this.expenseId = expenseId;
		this.travelSubtype = travelSubtype;
		this.startDate = startDate;
		this.endDate = endDate;

		if (endDate < startDate) {
			throw new Error('End date must be after start date');
		}
	}
}

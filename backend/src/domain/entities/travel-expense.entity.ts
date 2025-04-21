import { Entity } from '@/domain/entities/base.entity';

export enum TravelSubtype {
	ACCOMMODATION = 'accommodation',
	TRANSPORTATION = 'transportation',
	OTHER = 'other',
}

export class TravelExpense extends Entity {
	expenseId: string;
	travelSubtype: TravelSubtype;

	constructor(id: string, expenseId: string, travelSubtype: TravelSubtype) {
		super(id);
		this.expenseId = expenseId;
		this.travelSubtype = travelSubtype;
	}
}

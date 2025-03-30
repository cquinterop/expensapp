import { Entity } from '@/domain/entities/base.entity';

export class RegularExpense extends Entity {
	expenseId: string;
	receiptUrl: string;

	constructor(id: string, expenseId: string, receiptUrl: string) {
		super(id);
		this.expenseId = expenseId;
		this.receiptUrl = receiptUrl;
	}
}

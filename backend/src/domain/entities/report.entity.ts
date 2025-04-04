import { Entity } from '@/domain/entities/base.entity';

export class Report extends Entity {
	totalExpenses: number;
	totalAmount: number;
	approvedExpenses: number;
	approvedAmount: number;
	pendingExpenses: number;
	pendingAmount: number;
	rejectedExpenses: number;
	rejectedAmount: number;

	constructor(
		id: string,
		totalExpenses: number,
		totalAmount: number,
		approvedExpenses: number,
		approvedAmount: number,
		pendingExpenses: number,
		pendingAmount: number,
		rejectedExpenses: number,
		rejectedAmount: number,
	) {
		super(id);
		this.totalExpenses = totalExpenses;
		this.totalAmount = totalAmount;
		this.approvedExpenses = approvedExpenses;
		this.approvedAmount = approvedAmount;
		this.pendingExpenses = pendingExpenses;
		this.pendingAmount = pendingAmount;
		this.rejectedExpenses = rejectedExpenses;
		this.rejectedAmount = rejectedAmount;
	}
}

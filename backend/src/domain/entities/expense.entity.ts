import { Entity } from '@/domain/entities/base.entity';
import { User } from './user.entity';

export enum ExpenseType {
	REGULAR = 'regular',
	TRAVEL = 'travel',
	MILEAGE = 'mileage',
}

export enum ExpenseStatus {
	PENDING = 'pending',
	APPROVED = 'approved',
	REJECTED = 'rejected',
}

export class Expense extends Entity {
	tenantId: string;
	userId: string;
	amount: number;
	description: string;
	expenseType: ExpenseType;
	status: ExpenseStatus;
	submittedAt: Date;
	processedAt?: Date;
	processedBy?: string;
	submitter?: User['fullName'];

	constructor(
		id: string,
		tenantId: string,
		userId: string,
		amount: number,
		description: string,
		expenseType: ExpenseType,
		status: ExpenseStatus = ExpenseStatus.PENDING,
		submittedAt: Date = new Date(),
		submitter?: User['fullName'],
	) {
		super(id);
		this.tenantId = tenantId;
		this.userId = userId;
		this.amount = amount;
		this.description = description;
		this.expenseType = expenseType;
		this.status = status;
		this.submittedAt = submittedAt;
		this.submitter = submitter;
	}

	approve(adminId: string): void {
		if (this.status !== ExpenseStatus.PENDING) {
			throw new Error('Only pending expenses can be approved');
		}
		this.status = ExpenseStatus.APPROVED;
		this.processedAt = new Date();
		this.processedBy = adminId;
	}

	reject(adminId: string): void {
		if (this.status !== ExpenseStatus.PENDING) {
			throw new Error('Only pending expenses can be rejected');
		}
		this.status = ExpenseStatus.REJECTED;
		this.processedAt = new Date();
		this.processedBy = adminId;
	}

	get isPending(): boolean {
		return this.status === ExpenseStatus.PENDING;
	}

	get isApproved(): boolean {
		return this.status === ExpenseStatus.APPROVED;
	}

	get isRejected(): boolean {
		return this.status === ExpenseStatus.REJECTED;
	}
}

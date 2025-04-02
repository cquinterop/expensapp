import { Entity } from '@/domain/entities/base.entity';
import { AppError } from '../errors/app-error';

export class Tenant extends Entity {
	name: string;
	balance: number;
	isActive: boolean;

	constructor(id: string, name: string, balance: number = 0, isActive: boolean = true) {
		super(id);
		this.name = name;
		this.balance = balance;
		this.isActive = isActive;
	}

	updateBalance(amount: number): void {
		const newBalance = this.balance + amount;
		if (newBalance < 0) {
			throw new AppError('Tenant balance cannot go negative', 409);
		}
		this.balance = newBalance;
	}
}

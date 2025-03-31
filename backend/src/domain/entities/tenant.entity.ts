import { Entity } from '@/domain/entities/base.entity';

export class Tenant extends Entity {
	name: string;
	balance: number;

	constructor(id: string, name: string, balance: number = 0) {
		super(id);
		this.name = name;
		this.balance = balance;
	}

	updateBalance(amount: number): void {
		const newBalance = this.balance + amount;
		if (newBalance < 0) {
			throw new Error('Tenant balance cannot go negative');
		}
		this.balance = newBalance;
	}
}

import { RegularExpense } from '@/domain/entities/regular-expense.entity';

export interface RegularExpenseRepository {
	findByExpenseId(expenseId: string): Promise<RegularExpense | null>;
	create(regularExpense: RegularExpense): Promise<RegularExpense>;
	update(regularExpense: RegularExpense): Promise<RegularExpense>;
	delete(id: string): Promise<boolean>;
}

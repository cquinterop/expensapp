import { MileageExpense } from '@/domain/entities/mileage-expense.entity';

export interface MileageExpenseRepository {
	findByExpenseId(expenseId: string): Promise<MileageExpense | null>;
	create(mileageExpense: MileageExpense): Promise<MileageExpense>;
	update(mileageExpense: MileageExpense): Promise<MileageExpense>;
	delete(id: string): Promise<boolean>;
}

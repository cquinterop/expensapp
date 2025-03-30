import { TravelExpense } from '@/domain/entities/travel-expense.entity';

export interface TravelExpenseRepository {
	findByExpenseId(expenseId: string): Promise<TravelExpense | null>;
	create(travelExpense: TravelExpense): Promise<TravelExpense>;
	update(travelExpense: TravelExpense): Promise<TravelExpense>;
	delete(id: string): Promise<boolean>;
}

import { Expense, ExpenseStatus } from '@/domain/entities/expense.entity';

export interface ExpenseFilters {
	tenantId?: string;
	userId?: string;
	status?: ExpenseStatus;
	startDate?: Date;
	endDate?: Date;
	page?: number;
	limit?: number;
}

export interface ExpenseRepository {
	findById(id: string): Promise<Expense | null>;
	findByFilters(filters: ExpenseFilters): Promise<{ expenses: Expense[]; total: number }>;
	create(expense: Expense): Promise<Expense>;
	update(expense: Expense): Promise<Expense>;
	delete(id: string): Promise<boolean>;
}

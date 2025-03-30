import type { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import type { ExpenseService } from '@/domain/services/expense.service';
import { TYPES } from '@/infrastructure/config/types';
import { ExpenseStatus } from '@/domain/entities/expense.entity';

@injectable()
export class ReportController {
	constructor(@inject(TYPES.ExpenseService) private expenseService: ExpenseService) {}

	async generateExpenseReport(req: Request, res: Response): Promise<void> {
		try {
			// Only admins can generate reports
			if (!req.user?.isAdmin) {
				res.status(403).json({ error: 'Admin access required' });
				return;
			}

			const tenantId = req.user?.tenantId;
			const { startDate, endDate, status } = req.query;

			// Prepare filters
			const filters: any = {
				tenantId,
				page: 1,
				limit: 1000, // Get a large number of expenses for the report
			};

			if (startDate) {
				filters.startDate = new Date(startDate as string);
			}

			if (endDate) {
				filters.endDate = new Date(endDate as string);
			}

			if (status) {
				filters.status = status as ExpenseStatus;
			}

			// Get expenses
			const result = await this.expenseService.getExpenses(filters);

			// Calculate summary statistics
			const totalAmount = result.expenses.reduce((sum, expense) => sum + expense.amount, 0);
			const approvedAmount = result.expenses
				.filter((expense) => expense.status === ExpenseStatus.APPROVED)
				.reduce((sum, expense) => sum + expense.amount, 0);
			const pendingAmount = result.expenses
				.filter((expense) => expense.status === ExpenseStatus.PENDING)
				.reduce((sum, expense) => sum + expense.amount, 0);
			const rejectedAmount = result.expenses
				.filter((expense) => expense.status === ExpenseStatus.REJECTED)
				.reduce((sum, expense) => sum + expense.amount, 0);

			// Generate report
			const report = {
				period: {
					startDate: filters.startDate || 'All time',
					endDate: filters.endDate || 'Present',
				},
				summary: {
					totalExpenses: result.expenses.length,
					totalAmount,
					approvedExpenses: result.expenses.filter(
						(expense) => expense.status === ExpenseStatus.APPROVED,
					).length,
					approvedAmount,
					pendingExpenses: result.expenses.filter(
						(expense) => expense.status === ExpenseStatus.PENDING,
					).length,
					pendingAmount,
					rejectedExpenses: result.expenses.filter(
						(expense) => expense.status === ExpenseStatus.REJECTED,
					).length,
					rejectedAmount,
				},
				expenses: result.expenses,
			};

			res.status(200).json(report);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}
}

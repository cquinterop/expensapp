import type { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '@/infrastructure/config/types';
import { ExpenseStatus } from '@/domain/entities/expense.entity';
import { User } from '@/domain/entities/user.entity';
import { AppError, AuthorizationError } from '@/domain/errors/app-error';
import type { ReportService } from '@/domain/services/report.service';
import { ExpenseService } from '@/domain/services/expense.service';

@injectable()
export class ReportController {
	constructor(
		@inject(TYPES.ReportService) private readonly reportService: ReportService,
		@inject(TYPES.ExpenseService) private readonly expenseService: ExpenseService,
	) {}

	async generateExpenseReport(req: Request, res: Response, next: NextFunction) {
		try {
			const { isAdmin, tenantId } = req.user as User;
			if (!isAdmin) {
				throw new AuthorizationError('Admin access required');
			}

			const { startDate, endDate, status } = req.query;
			const filters: any = {
				tenantId,
				...(startDate && { startDate: new Date(startDate as string) }),
				...(endDate && { endDate: new Date(endDate as string) }),
				...(status && { status: status as ExpenseStatus }),
			};

			const [reportData] = await this.reportService.getExpensesReport(filters);
			const { expenses } = await this.expenseService.getExpenses(filters);
			if (!reportData) {
				throw new AppError('No report data found', 404);
			}

			const report = {
				period: {
					startDate: filters.startDate || 'All time',
					endDate: filters.endDate || 'Present',
				},
				summary: {
					total: {
						expenses: Number(reportData.totalExpenses),
						amount: Number(reportData.totalAmount),
					},
					approved: {
						expenses: Number(reportData.approvedExpenses),
						amount: Number(reportData.approvedAmount),
					},
					pending: {
						expenses: Number(reportData.pendingExpenses),
						amount: Number(reportData.pendingAmount),
					},
					rejected: {
						expenses: Number(reportData.rejectedExpenses),
						amount: Number(reportData.rejectedAmount),
					},
				},
				expenses,
			};

			res.status(200).json(report);
		} catch (error) {
			next(error);
		}
	}
}

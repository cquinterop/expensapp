import { injectable } from 'inversify';
import { Sequelize } from 'sequelize';
import type { ReportRepository, ReportFilters } from '@/domain/repositories/report.repository';
import { ExpenseModel } from '../database/models/expense.model';

@injectable()
export class ReportRepositoryImpl implements ReportRepository {
	async findReportData(filters: Partial<ReportFilters>) {
		const reportData = await ExpenseModel.findAll({
			where: filters,
			attributes: [
				[Sequelize.fn('COUNT', Sequelize.col('id')), 'totalExpenses'],
				[Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'],
				[
					Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN status = 'approved' THEN 1 ELSE 0 END`)),
					'approvedExpenses',
				],
				[
					Sequelize.fn(
						'SUM',
						Sequelize.literal(`CASE WHEN status = 'approved' THEN amount ELSE 0 END`),
					),
					'approvedAmount',
				],
				[
					Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN status = 'pending' THEN 1 ELSE 0 END`)),
					'pendingExpenses',
				],
				[
					Sequelize.fn(
						'SUM',
						Sequelize.literal(`CASE WHEN status = 'pending' THEN amount ELSE 0 END`),
					),
					'pendingAmount',
				],
				[
					Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN status = 'rejected' THEN 1 ELSE 0 END`)),
					'rejectedExpenses',
				],
				[
					Sequelize.fn(
						'SUM',
						Sequelize.literal(`CASE WHEN status = 'rejected' THEN amount ELSE 0 END`),
					),
					'rejectedAmount',
				],
			],
			raw: true,
		});

		return reportData;
	}
}

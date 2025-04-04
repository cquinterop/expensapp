import { injectable, inject } from 'inversify';
import { ReportService } from '@/domain/services/report.service';
import { TYPES } from '@/infrastructure/config/types';
import { ReportFilters, ReportRepository } from '@/domain/repositories/report.repository';

@injectable()
export class ReportServiceImpl implements ReportService {
	constructor(
		@inject(TYPES.ReportRepository) private readonly reportRepository: ReportRepository,
	) {}

	async getExpensesReport(filters: ReportFilters) {
		const expenses = await this.reportRepository.findReportData(filters);

		return expenses;
	}
}

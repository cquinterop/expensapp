import { ReportFilters } from '@/domain/repositories/report.repository';

export interface ReportService {
	getExpensesReport(filters: ReportFilters): Promise<object>;
}

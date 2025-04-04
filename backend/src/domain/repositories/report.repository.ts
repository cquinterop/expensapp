import { ExpenseStatus } from '@/domain/entities/expense.entity';

export interface ReportFilters {
	tenantId?: string;
	userId?: string;
	status?: ExpenseStatus;
	startDate?: Date;
	endDate?: Date;
	page?: number;
	limit?: number;
}

export interface ReportRepository {
	findReportData(filters: ReportFilters): Promise<object>;
}

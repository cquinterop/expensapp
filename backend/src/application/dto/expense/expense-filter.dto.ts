import { IsDateString, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { ExpenseStatus } from '@/domain/entities/expense.entity';

export class ExpenseFilterDto {
	@IsOptional()
	@IsEnum(ExpenseStatus)
	status?: ExpenseStatus;

	@IsOptional()
	@IsDateString()
	startDate?: string;

	@IsOptional()
	@IsDateString()
	endDate?: string;

	@IsOptional()
	@IsNumber()
	@Min(1)
	page?: number;

	@IsOptional()
	@IsNumber()
	@Min(1)
	limit?: number;
}

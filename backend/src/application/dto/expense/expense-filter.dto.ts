import { IsDateString, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { ExpenseStatus } from '@/domain/entities/expense.entity';
import { Transform } from 'class-transformer';

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
	@Transform(({ value }) => value && Number(value))
	@IsNumber()
	@Min(1)
	page?: number;

	@IsOptional()
	@Transform(({ value }) => value && Number(value))
	@IsNumber()
	@Min(1)
	limit?: number;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMileageExpenseDto {
	@IsNotEmpty()
	@IsString()
	description!: string;

	@IsNotEmpty()
	@IsNumber()
	@Min(0.1)
	distanceKm!: number;

	@IsOptional()
	@IsNumber()
	@Min(0.01)
	ratePerKm?: number;
}

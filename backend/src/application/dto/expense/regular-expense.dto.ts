import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class CreateRegularExpenseDto {
	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsNumber()
	@Min(0.01)
	amount: number;

	@IsNotEmpty()
	@IsString()
	@IsUrl()
	receiptUrl: string;
}

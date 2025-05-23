import {
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsString,
	Min,
	ValidateIf,
} from 'class-validator';
import { TravelSubtype } from '@/domain/entities/travel-expense.entity';

export class CreateTravelExpenseDto {
	@IsNotEmpty()
	@IsString()
	description!: string;

	@IsNotEmpty()
	@IsNumber()
	@Min(0.01)
	amount!: number;

	@IsNotEmpty()
	@IsEnum(TravelSubtype)
	travelSubtype!: TravelSubtype;

	@ValidateIf((o) => o.travelSubtype === TravelSubtype.ACCOMMODATION)
	@IsNotEmpty()
	@IsString()
	hotelName?: string;

	@ValidateIf((o) => o.travelSubtype === TravelSubtype.ACCOMMODATION)
	@IsNotEmpty()
	@IsDateString()
	checkInDate?: string;

	@ValidateIf((o) => o.travelSubtype === TravelSubtype.ACCOMMODATION)
	@IsNotEmpty()
	@IsDateString()
	checkOutDate?: string;

	@ValidateIf((o) => o.travelSubtype === TravelSubtype.TRANSPORTATION)
	@IsNotEmpty()
	@IsString()
	transportationMode?: string;

	@ValidateIf((o) => o.travelSubtype === TravelSubtype.TRANSPORTATION)
	@IsNotEmpty()
	@IsString()
	route?: string;
}

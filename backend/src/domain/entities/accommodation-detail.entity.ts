import { Entity } from '@/domain/entities/base.entity';

export class AccommodationDetail extends Entity {
	travelExpenseId: string;
	hotelName: string;
	checkInDate: Date;
	checkOutDate: Date;

	constructor(
		id: string,
		travelExpenseId: string,
		hotelName: string,
		checkInDate: Date,
		checkOutDate: Date,
	) {
		super(id);
		this.travelExpenseId = travelExpenseId;
		this.hotelName = hotelName;
		this.checkInDate = checkInDate;
		this.checkOutDate = checkOutDate;

		if (checkOutDate < checkInDate) {
			throw new Error('Check-out date must be after check-in date');
		}
	}
}

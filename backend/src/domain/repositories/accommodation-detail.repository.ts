import { AccommodationDetail } from '@/domain/entities/accommodation-detail.entity';

export interface AccommodationDetailRepository {
	findByTravelExpenseId(travelExpenseId: string): Promise<AccommodationDetail | null>;
	create(accommodationDetail: AccommodationDetail): Promise<AccommodationDetail>;
	update(accommodationDetail: AccommodationDetail): Promise<AccommodationDetail>;
	delete(id: string): Promise<boolean>;
}

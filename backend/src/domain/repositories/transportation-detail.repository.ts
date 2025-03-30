import { TransportationDetail } from '@/domain/entities/transportation-detail.entity';

export interface TransportationDetailRepository {
	findByTravelExpenseId(travelExpenseId: string): Promise<TransportationDetail | null>;
	create(transportationDetail: TransportationDetail): Promise<TransportationDetail>;
	update(transportationDetail: TransportationDetail): Promise<TransportationDetail>;
	delete(id: string): Promise<boolean>;
}

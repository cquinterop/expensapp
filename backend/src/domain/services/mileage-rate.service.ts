import { MileageRate } from '@/domain/entities/mileage-rate.entity';

export interface MileageRateService {
	getCurrentMileageRate(tenantId: string): Promise<number>;
	updateMileageRate(tenantId: string, rate: number): Promise<MileageRate>;
}

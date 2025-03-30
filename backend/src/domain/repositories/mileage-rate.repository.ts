import { MileageRate } from '@/domain/entities/mileage-rate.entity';

export interface MileageRateRepository {
	findLatestByTenantId(tenantId: string): Promise<MileageRate | null>;
	create(mileageRate: MileageRate): Promise<MileageRate>;
}

import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { MileageRateService } from '@/domain/services/mileage-rate.service';
import { MileageRate } from '@/domain/entities/mileage-rate.entity';
import { MileageRateRepository } from '@/domain/repositories/mileage-rate.repository';
import { TenantRepository } from '@/domain/repositories/tenant.repository';
import { TYPES } from '@/infrastructure/config/types';

@injectable()
export class MileageRateServiceImpl implements MileageRateService {
	constructor(
		@inject(TYPES.MileageRateRepository) private mileageRateRepository: MileageRateRepository,
		@inject(TYPES.TenantRepository) private tenantRepository: TenantRepository,
	) {}

	async getCurrentMileageRate(tenantId: string): Promise<number> {
		// Check if tenant exists
		const tenant = await this.tenantRepository.findById(tenantId);
		if (!tenant) {
			throw new Error('Tenant not found');
		}

		// Get latest mileage rate for tenant
		const mileageRate = await this.mileageRateRepository.findLatestByTenantId(tenantId);

		// Return default rate if no rate is set for tenant
		if (!mileageRate) {
			return parseFloat(process.env.DEFAULT_MILEAGE_RATE || '0.30');
		}

		return mileageRate.rate;
	}

	async updateMileageRate(tenantId: string, rate: number): Promise<MileageRate> {
		// Check if tenant exists
		const tenant = await this.tenantRepository.findById(tenantId);
		if (!tenant) {
			throw new Error('Tenant not found');
		}

		// Create new mileage rate
		const mileageRate = new MileageRate(uuidv4(), tenantId, rate);
		return this.mileageRateRepository.create(mileageRate);
	}
}

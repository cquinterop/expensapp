import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { MileageRateService } from '@/domain/services/mileage-rate.service';
import { MileageRate } from '@/domain/entities/mileage-rate.entity';
import { MileageRateRepository } from '@/domain/repositories/mileage-rate.repository';
import { TenantRepository } from '@/domain/repositories/tenant.repository';
import { TYPES } from '@/infrastructure/config/types';
import { AppError } from '@/domain/errors/app-error';

@injectable()
export class MileageRateServiceImpl implements MileageRateService {
	constructor(
		@inject(TYPES.MileageRateRepository)
		private readonly mileageRateRepository: MileageRateRepository,
		@inject(TYPES.TenantRepository) private readonly tenantRepository: TenantRepository,
	) {}

	async getCurrentMileageRate(tenantId: string) {
		const tenant = await this.tenantRepository.findById(tenantId);
		if (!tenant) {
			throw new AppError('Tenant not found', 404);
		}

		const mileageRate = await this.mileageRateRepository.findLatestByTenantId(tenantId);

		if (!mileageRate) {
			return parseFloat(process.env.DEFAULT_MILEAGE_RATE || '0.30');
		}

		return mileageRate.rate;
	}

	async updateMileageRate(tenantId: string, rate: number) {
		const tenant = await this.tenantRepository.findById(tenantId);
		if (!tenant) {
			throw new AppError('Tenant not found', 404);
		}

		const mileageRate = new MileageRate(uuidv4(), tenantId, rate);

		return this.mileageRateRepository.create(mileageRate);
	}
}

import { injectable } from 'inversify';
import type { MileageRateRepository } from '@/domain/repositories/mileage-rate.repository';
import { MileageRate } from '@/domain/entities/mileage-rate.entity';
import { MileageRateModel } from '@/infrastructure/database/models/mileage-rate.model';

@injectable()
export class MileageRateRepositoryImpl implements MileageRateRepository {
	async findLatestByTenantId(tenantId: string): Promise<MileageRate | null> {
		const mileageRateModel = await MileageRateModel.findOne({
			where: { tenantId },
			order: [['effectiveDate', 'DESC']],
		});

		if (!mileageRateModel) {
			return null;
		}

		return this.mapModelToEntity(mileageRateModel);
	}

	async create(mileageRate: MileageRate): Promise<MileageRate> {
		const mileageRateModel = await MileageRateModel.create({
			id: mileageRate.id,
			tenantId: mileageRate.tenantId,
			rate: mileageRate.rate,
			effectiveDate: mileageRate.effectiveDate,
			createdAt: mileageRate.createdAt,
			updatedAt: mileageRate.updatedAt,
		});

		return this.mapModelToEntity(mileageRateModel);
	}

	private mapModelToEntity(model: MileageRateModel): MileageRate {
		const mileageRate = new MileageRate(
			model.id,
			model.tenantId,
			Number.parseFloat(model.rate.toString()),
			model.effectiveDate,
		);
		mileageRate.createdAt = model.createdAt;
		mileageRate.updatedAt = model.updatedAt;
		return mileageRate;
	}
}

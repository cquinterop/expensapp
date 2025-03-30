import { injectable } from 'inversify';
import type { TransportationDetailRepository } from '@/domain/repositories/transportation-detail.repository';
import { TransportationDetail } from '@/domain/entities/transportation-detail.entity';
import { TransportationDetailModel } from '@/infrastructure/database/models/transportation-detail.model';

@injectable()
export class TransportationDetailRepositoryImpl implements TransportationDetailRepository {
	async findByTravelExpenseId(travelExpenseId: string): Promise<TransportationDetail | null> {
		const transportationDetailModel = await TransportationDetailModel.findOne({
			where: { travelExpenseId },
		});
		if (!transportationDetailModel) {
			return null;
		}

		return this.mapModelToEntity(transportationDetailModel);
	}

	async create(transportationDetail: TransportationDetail): Promise<TransportationDetail> {
		const transportationDetailModel = await TransportationDetailModel.create({
			id: transportationDetail.id,
			travelExpenseId: transportationDetail.travelExpenseId,
			transportationMode: transportationDetail.transportationMode,
			route: transportationDetail.route,
			createdAt: transportationDetail.createdAt,
			updatedAt: transportationDetail.updatedAt,
		});

		return this.mapModelToEntity(transportationDetailModel);
	}

	async update(transportationDetail: TransportationDetail): Promise<TransportationDetail> {
		const transportationDetailModel = await TransportationDetailModel.findByPk(
			transportationDetail.id,
		);
		if (!transportationDetailModel) {
			throw new Error('Transportation detail not found');
		}

		await transportationDetailModel.update({
			transportationMode: transportationDetail.transportationMode,
			route: transportationDetail.route,
			updatedAt: new Date(),
		});

		return this.mapModelToEntity(transportationDetailModel);
	}

	async delete(id: string): Promise<boolean> {
		const transportationDetailModel = await TransportationDetailModel.findByPk(id);
		if (!transportationDetailModel) {
			return false;
		}

		await transportationDetailModel.destroy();
		return true;
	}

	private mapModelToEntity(model: TransportationDetailModel): TransportationDetail {
		const transportationDetail = new TransportationDetail(
			model.id,
			model.travelExpenseId,
			model.transportationMode,
			model.route,
		);
		transportationDetail.createdAt = model.createdAt;
		transportationDetail.updatedAt = model.updatedAt;
		return transportationDetail;
	}
}

import { injectable } from 'inversify';
import type { AccommodationDetailRepository } from '@/domain/repositories/accommodation-detail.repository';
import { AccommodationDetail } from '@/domain/entities/accommodation-detail.entity';
import { AccommodationDetailModel } from '@/infrastructure/database/models/accommodation-detail.model';

@injectable()
export class AccommodationDetailRepositoryImpl implements AccommodationDetailRepository {
	async findByTravelExpenseId(travelExpenseId: string) {
		const accommodationDetailModel = await AccommodationDetailModel.findOne({
			where: { travelExpenseId },
		});
		if (!accommodationDetailModel) {
			return null;
		}

		return this.mapModelToEntity(accommodationDetailModel);
	}

	async create(accommodationDetail: AccommodationDetail) {
		const accommodationDetailModel = await AccommodationDetailModel.create({
			id: accommodationDetail.id,
			travelExpenseId: accommodationDetail.travelExpenseId,
			hotelName: accommodationDetail.hotelName,
			checkInDate: accommodationDetail.checkInDate,
			checkOutDate: accommodationDetail.checkOutDate,
			createdAt: accommodationDetail.createdAt,
			updatedAt: accommodationDetail.updatedAt,
		});

		return this.mapModelToEntity(accommodationDetailModel);
	}

	async update(accommodationDetail: AccommodationDetail) {
		const accommodationDetailModel = await AccommodationDetailModel.findByPk(
			accommodationDetail.id,
		);
		if (!accommodationDetailModel) {
			throw new Error('Accommodation detail not found');
		}

		await accommodationDetailModel.update({
			hotelName: accommodationDetail.hotelName,
			checkInDate: accommodationDetail.checkInDate,
			checkOutDate: accommodationDetail.checkOutDate,
			updatedAt: new Date(),
		});

		return this.mapModelToEntity(accommodationDetailModel);
	}

	async delete(id: string) {
		const accommodationDetailModel = await AccommodationDetailModel.findByPk(id);
		if (!accommodationDetailModel) {
			return false;
		}

		await accommodationDetailModel.destroy();
		return true;
	}

	private mapModelToEntity(model: AccommodationDetailModel) {
		const accommodationDetail = new AccommodationDetail(
			model.id,
			model.travelExpenseId,
			model.hotelName,
			model.checkInDate,
			model.checkOutDate,
		);
		accommodationDetail.createdAt = model.createdAt;
		accommodationDetail.updatedAt = model.updatedAt;
		return accommodationDetail;
	}
}

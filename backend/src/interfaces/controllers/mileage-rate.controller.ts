import type { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import type { MileageRateService } from '@/domain/services/mileage-rate.service';
import { TYPES } from '@/infrastructure/config/types';
import { IsNumber, Min, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

class UpdateMileageRateDto {
	@IsNumber()
	@Min(0.01)
	rate!: number;
}

@injectable()
export class MileageRateController {
	constructor(@inject(TYPES.MileageRateService) private mileageRateService: MileageRateService) {}

	async getCurrentMileageRate(req: Request, res: Response): Promise<void> {
		try {
			const tenantId = req.user?.tenantId;
			const rate = await this.mileageRateService.getCurrentMileageRate(tenantId);
			res.status(200).json({ rate });
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}

	async updateMileageRate(req: Request, res: Response): Promise<void> {
		try {
			// Only admins can update mileage rate
			if (!req.user?.isAdmin) {
				res.status(403).json({ error: 'Admin access required' });
				return;
			}

			// Validate request body
			const updateDto = plainToClass(UpdateMileageRateDto, req.body);
			const errors = await validate(updateDto);
			if (errors.length > 0) {
				res.status(400).json({ errors });
				return;
			}

			const tenantId = req.user?.tenantId;
			const mileageRate = await this.mileageRateService.updateMileageRate(tenantId, updateDto.rate);
			res.status(200).json(mileageRate);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}
}

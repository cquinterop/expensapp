import type { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import type { MileageRateService } from '@/domain/services/mileage-rate.service';
import { TYPES } from '@/infrastructure/config/types';
import { IsNumber, Min, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { User } from '@/domain/entities/user.entity';

class UpdateMileageRateDto {
	@IsNumber()
	@Min(0.01)
	rate!: number;
}

@injectable()
export class MileageRateController {
	constructor(
		@inject(TYPES.MileageRateService) private readonly mileageRateService: MileageRateService,
	) {}

	async getCurrentMileageRate(req: Request, res: Response, next: NextFunction) {
		try {
			const { tenantId } = req.user as User;
			const rate = await this.mileageRateService.getCurrentMileageRate(tenantId);

			res.status(200).json({ rate });
		} catch (error) {
			next(error);
		}
	}

	async updateMileageRate(req: Request, res: Response, next: NextFunction) {
		try {
			const { isAdmin, tenantId } = req.user as User;

			if (!isAdmin) {
				res.status(403).json({ error: 'Admin access required' });
				return;
			}

			const updateDto = plainToClass(UpdateMileageRateDto, req.body);
			const errors = await validate(updateDto);
			if (errors.length > 0) {
				res.status(400).json({ errors });
				return;
			}

			const mileageRate = await this.mileageRateService.updateMileageRate(tenantId, updateDto.rate);
			res.status(200).json(mileageRate);
		} catch (error) {
			next(error);
		}
	}
}

import { Entity } from '@/domain/entities/base.entity';

export class MileageRate extends Entity {
	tenantId: string;
	rate: number;
	effectiveDate: Date;

	constructor(id: string, tenantId: string, rate: number, effectiveDate: Date = new Date()) {
		super(id);
		this.tenantId = tenantId;
		this.rate = rate;
		this.effectiveDate = effectiveDate;

		if (rate <= 0) {
			throw new Error('Mileage rate must be greater than 0');
		}
	}
}

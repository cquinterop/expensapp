import { Entity } from '@/domain/entities/base.entity';

export class TransportationDetail extends Entity {
	travelExpenseId: string;
	transportationMode: string;
	route: string;

	constructor(id: string, travelExpenseId: string, transportationMode: string, route: string) {
		super(id);
		this.travelExpenseId = travelExpenseId;
		this.transportationMode = transportationMode;
		this.route = route;
	}
}

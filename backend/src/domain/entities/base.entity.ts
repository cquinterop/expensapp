export abstract class Entity {
	id: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(id: string) {
		this.id = id;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

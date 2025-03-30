import { Entity } from '@/domain/entities/base.entity';

export enum UserRole {
	ADMIN = 'admin',
	EMPLOYEE = 'employee',
}

export class User extends Entity {
	constructor(
		id: string,
		public tenantId: string,
		public email: string,
		public fullName: string,
		public passwordHash: string,
		public role: UserRole,
	) {
		super(id);
	}

	get isAdmin(): boolean {
		return this.role === UserRole.ADMIN;
	}
}

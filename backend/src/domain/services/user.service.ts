import { User, UserRole } from '@/domain/entities/user.entity';

export interface UserService {
	createUser(
		tenantId: string,
		email: string,
		password: string,
		fullName: string,
		role: UserRole,
	): Promise<User>;
	getUserById(id: string): Promise<User>;
	getUsersByTenantId(tenantId: string): Promise<User[]>;
	updateUser(id: string, data: Partial<User>): Promise<User>;
	deleteUser(id: string): Promise<boolean>;
}

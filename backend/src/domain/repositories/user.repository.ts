import { User } from '@/domain/entities/user.entity';

export interface UserRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByTenantId(tenantId: string): Promise<User[]>;
	create(user: User): Promise<User>;
	update(user: User): Promise<User>;
	delete(id: string): Promise<boolean>;
}

import { User } from '@/domain/entities/user.entity';

export interface UserRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string, tenantId: string): Promise<User | null>;
	findByTenantId(tenantId: string): Promise<User[]>;
	create(user: User): Promise<User>;
}

import { User } from '@/domain/entities/user.entity';

export interface AuthService {
	signup(
		tenantName: string,
		email: string,
		password: string,
		fullName: string,
	): Promise<{ user: User; token: string }>;
	signin(email: string, password: string): Promise<{ user: User; token: string }>;
}

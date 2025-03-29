import { injectable, inject } from 'inversify';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '@/domain/services/user.service';
import { User, UserRole } from '@/domain/entities/user.entity';
import { UserRepository } from '@/domain/repositories/user.repository';
import { TenantRepository } from '@/domain/repositories/tenant.repository';
import { TYPES } from '@/infrastructure/config/types';

@injectable()
export class UserServiceImpl implements UserService {
	constructor(
		@inject(TYPES.UserRepository) private userRepository: UserRepository,
		@inject(TYPES.TenantRepository) private tenantRepository: TenantRepository,
	) {}

	async createUser(
		tenantId: string,
		email: string,
		password: string,
		fullName: string,
		role: UserRole,
	): Promise<User> {
		// Check if tenant exists
		const tenant = await this.tenantRepository.findById(tenantId);
		if (!tenant) {
			throw new Error('Tenant not found');
		}

		// Check if user with same email already exists in this tenant
		const existingUser = await this.userRepository.findByEmail(email, tenantId);
		if (existingUser) {
			throw new Error('User with this email already exists in this tenant');
		}

		// Hash password
		const passwordHash = await bcrypt.hash(password, 10);

		// Create user
		const user = new User(uuidv4(), tenantId, email, fullName, passwordHash, role);

		return this.userRepository.create(user);
	}

	async getUserById(id: string): Promise<User> {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}

	async getUsersByTenantId(tenantId: string): Promise<User[]> {
		// Check if tenant exists
		const tenant = await this.tenantRepository.findById(tenantId);
		if (!tenant) {
			throw new Error('Tenant not found');
		}

		return this.userRepository.findByTenantId(tenantId);
	}
}

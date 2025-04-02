import { injectable, inject } from 'inversify';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '@/domain/services/user.service';
import { User, UserRole } from '@/domain/entities/user.entity';
import { UserRepository } from '@/domain/repositories/user.repository';
import { TenantRepository } from '@/domain/repositories/tenant.repository';
import { TYPES } from '@/infrastructure/config/types';
import { SAULT_ROUNDS } from '@/infrastructure/config/env';
import { AppError } from '@/domain/errors/app-error';

@injectable()
export class UserServiceImpl implements UserService {
	constructor(
		@inject(TYPES.UserRepository) private readonly userRepository: UserRepository,
		@inject(TYPES.TenantRepository) private readonly tenantRepository: TenantRepository,
	) {}

	async createUser(
		tenantId: string,
		email: string,
		password: string,
		fullName: string,
		role: UserRole,
	): Promise<User> {
		const tenant = await this.tenantRepository.findById(tenantId);
		if (!tenant) {
			throw new AppError('Tenant not found', 404);
		}

		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) {
			throw new AppError('User with this email already exists in this tenant', 409);
		}

		const passwordHash = await bcrypt.hash(password, SAULT_ROUNDS);

		const newUser = new User(uuidv4(), tenantId, email, fullName, passwordHash, role, true);
		const user = await this.userRepository.create(newUser);

		return user;
	}

	async getUserById(id: string) {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new AppError('User not found', 404);
		}
		return user;
	}

	async getUsersByTenantId(tenantId: string) {
		const tenant = await this.tenantRepository.findById(tenantId);
		if (!tenant) {
			throw new AppError('Tenant not found', 404);
		}

		const user = await this.userRepository.findByTenantId(tenantId);

		return user;
	}

	async updateUser(id: string, data: Partial<User>) {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new AppError('User not found', 404);
		}

		Object.assign(user, data);
		user.updatedAt = new Date();

		return this.userRepository.update(user);
	}
	async deleteUser(id: string) {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new AppError('User not found', 404);
		}

		return this.userRepository.delete(id);
	}
}

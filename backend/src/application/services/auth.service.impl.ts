import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import type { AuthService } from '@/domain/services/auth.service';
import type { UserRepository } from '@/domain/repositories/user.repository';
import type { TenantRepository } from '@/domain/repositories/tenant.repository';
import { User, UserRole } from '@/domain/entities/user.entity';
import { Tenant } from '@/domain/entities/tenant.entity';
import { TYPES } from '@/infrastructure/config/types';
import { AuthenticationError } from '@/domain/errors/app-error';
import { JWT_EXPIRATION, JWT_SECRET, SAULT_ROUNDS } from '@/infrastructure/config/env';

@injectable()
export class AuthServiceImpl implements AuthService {
	constructor(
		@inject(TYPES.UserRepository) private readonly userRepository: UserRepository,
		@inject(TYPES.TenantRepository) private readonly tenantRepository: TenantRepository,
	) {}

	async login(email: string, password: string) {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new AuthenticationError('Invalid email or password');
		}

		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
		if (!isPasswordValid) {
			throw new AuthenticationError('Invalid email or password');
		}

		if (!user.isActive) {
			throw new AuthenticationError('User account is inactive');
		}

		const token = this.generateToken(user);

		return { token, user };
	}

	async signup(tenantName: string, email: string, password: string, fullName: string) {
		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) {
			throw new AuthenticationError('User already exists');
		}

		let tenant = await this.tenantRepository.findByName(tenantName);
		if (!tenant) {
			tenant = await this.tenantRepository.create(new Tenant(uuidv4(), tenantName, 0));
		}

		const userId = uuidv4();
		const passwordHash = await bcrypt.hash(password, SAULT_ROUNDS);
		const role = UserRole.EMPLOYEE;
		const newUser = new User(userId, tenant.id, email, fullName, passwordHash, role, true);
		const user = await this.userRepository.create(newUser);

		const token = this.generateToken(user);

		return { token, user, tenant };
	}

	private generateToken(user: User) {
		const payload = {
			userId: user.id,
			email: user.email,
			tenantId: user.tenantId,
			role: user.role,
		};

		return jwt.sign(payload, JWT_SECRET, {
			expiresIn: JWT_EXPIRATION,
		} as SignOptions);
	}
}

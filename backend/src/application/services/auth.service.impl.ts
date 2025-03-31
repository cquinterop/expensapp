import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import type { AuthService } from '@/domain/services/auth.service';
import type { UserRepository } from '@/domain/repositories/user.repository';
import type { TenantRepository } from '@/domain/repositories/tenant.repository';
import { User, UserRole } from '@/domain/entities/user.entity';
import { Tenant } from '@/domain/entities/tenant.entity';
import { TYPES } from '@/infrastructure/config/types';
import { AuthenticationError, ValidationError } from '@/domain/errors/app-error';
import { SignupDto } from '@/application/dto/auth/signup.dto';
import { JWT_EXPIRATION, JWT_SECRET } from '@/infrastructure/config/env';

@injectable()
export class AuthServiceImpl implements AuthService {
	constructor(
		@inject(TYPES.UserRepository) private readonly userRepository: UserRepository,
		@inject(TYPES.TenantRepository) private readonly tenantRepository: TenantRepository,
	) {}

	async login(email: string, password: string): Promise<{ token: string; user: User }> {
		// Find user by email
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new AuthenticationError('Invalid email or password');
		}

		// Verify password
		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
		if (!isPasswordValid) {
			throw new AuthenticationError('Invalid email or password');
		}

		// Generate JWT token
		const token = this.generateToken(user);

		return { token, user };
	}

	async signup(
		tenantName: string,
		email: string,
		password: string,
		fullName: string,
	): Promise<{ token: string; user: User; tenant: Tenant }> {
		// Validate input using class-validator
		const signupDto = plainToClass(SignupDto, { tenantName, email, password, fullName });
		const errors = await validate(signupDto);
		if (errors.length > 0) {
			throw new ValidationError('Invalid signup data', errors);
		}

		// Create tenant
		const tenantId = uuidv4();
		const tenant = new Tenant(tenantId, tenantName, 0, true);
		await this.tenantRepository.create(tenant);

		// Hash password
		const passwordHash = await bcrypt.hash(password, 10);

		// Create user
		const userId = uuidv4();
		const role = UserRole.EMPLOYEE;
		const user = new User(userId, tenantId, email, fullName, passwordHash, role);
		await this.userRepository.create(user);

		// Generate JWT token
		const token = this.generateToken(user);

		return { token, user, tenant };
	}

	private generateToken(user: User): string {
		const payload = {
			userId: user.id,
			email: user.email,
			tenantId: user.tenantId,
			role: user.role,
		};

		return jwt.sign(payload, JWT_SECRET, {
			expiresIn: JWT_EXPIRATION,
		});
	}
}

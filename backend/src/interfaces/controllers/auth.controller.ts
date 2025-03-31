import type { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import type { AuthService } from '@/domain/services/auth.service';
import { TYPES } from '@/infrastructure/config/types';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { LoginDto } from '@/application/dto/auth/login.dto';
import { SignupDto } from '@/application/dto/auth/signup.dto';
import { NODE_ENV } from '@/infrastructure/config/env';
import { ValidationError } from '@/domain/errors/app-error';

@injectable()
export class AuthController {
	constructor(@inject(TYPES.AuthService) private readonly authService: AuthService) {}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// Validate request body
			const loginDto = plainToClass(LoginDto, req.body);
			const errors = await validate(loginDto);
			if (errors.length > 0) {
				throw new ValidationError('Invalid login credentials', errors);
			}

			const { email, password } = req.body;
			const { token, user } = await this.authService.login(email, password);

			// Set JWT token in cookie
			res.cookie('token', token, {
				httpOnly: true,
				secure: NODE_ENV === 'production',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});

			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	async signup(req: Request, res: Response): Promise<void> {
		try {
			// Validate request body
			const signupDto = plainToClass(SignupDto, req.body);
			const errors = await validate(signupDto);
			if (errors.length > 0) {
				res.status(400).json({ errors });
				return;
			}

			const { tenantName, email, password, fullName } = req.body;
			const result = await this.authService.signup(tenantName, email, password, fullName);

			// Set JWT token in cookie
			res.cookie('token', result.token, {
				httpOnly: true,
				secure: NODE_ENV === 'production',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});

			res.status(201).json(result);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}

	async logout(req: Request, res: Response): Promise<void> {
		// Clear JWT token cookie
		res.clearCookie('token');
		res.status(200).json({ message: 'Logged out successfully' });
	}

	async getCurrentUser(req: Request, res: Response): Promise<void> {
		try {
			res.status(200).json(req.user);
		} catch (error) {
			res.status(401).json({ error: (error as Error).message });
		}
	}
}

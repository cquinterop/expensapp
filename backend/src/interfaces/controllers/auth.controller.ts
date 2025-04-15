import type { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import type { AuthService } from '@/domain/services/auth.service';
import { TYPES } from '@/infrastructure/config/types';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SigninDto } from '@/application/dto/auth/signin.dto';
import { SignupDto } from '@/application/dto/auth/signup.dto';
import { NODE_ENV } from '@/infrastructure/config/env';
import { ValidationError } from '@/domain/errors/app-error';
import { User } from '@/domain/entities/user.entity';

@injectable()
export class AuthController {
	constructor(@inject(TYPES.AuthService) private readonly authService: AuthService) {}

	async signin(req: Request, res: Response, next: NextFunction) {
		try {
			const signinDto = plainToClass(SigninDto, req.body);
			const errors = await validate(signinDto);
			if (errors.length) {
				throw new ValidationError('Invalid signin credentials', errors);
			}

			const { email, password } = req.body;
			const { token, user } = await this.authService.signin(email, password);

			res.cookie('token', token, {
				httpOnly: true,
				secure: NODE_ENV === 'production',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});

			res.status(200).json({
				fullName: user.fullName,
				email: user.email,
				role: user.role,
				tenantId: user.tenantId,
				tenantName: user.tenantName,
			});
		} catch (error) {
			next(error);
		}
	}

	async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const signupDto = plainToClass(SignupDto, req.body);
			const errors = await validate(signupDto);
			if (errors.length) {
				throw new ValidationError('Invalid input data', errors);
			}

			const { tenantName, email, password, fullName } = req.body;
			const { token, user } = await this.authService.signup(tenantName, email, password, fullName);

			res.cookie('token', token, {
				httpOnly: true,
				secure: NODE_ENV === 'production',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});

			res.status(201).json({ ...user, tenantName });
		} catch (error) {
			next(error);
		}
	}

	async signout(_req: Request, res: Response) {
		res.clearCookie('token');
		res.status(200).json({ message: 'Logged out successfully' });
	}

	async getCurrentUser(req: Request, res: Response, next: NextFunction) {
		const user = req.user as User;

		try {
			res.status(200).json({
				fullName: user.fullName,
				email: user.email,
				role: user.role,
				tenantId: user.tenantId,
				tenantName: user.tenantName,
			});
		} catch (error) {
			next(error);
		}
	}
}

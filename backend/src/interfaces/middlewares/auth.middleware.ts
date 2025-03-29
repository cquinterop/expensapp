import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { container } from '@/infrastructure/config/inversify.config';
import { TYPES } from '@/infrastructure/config/types';
import type { UserService } from '@/domain/services/user.service';
import { JWT_SECRET } from '@/infrastructure/config/env';

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		// Get token from Authorization header or cookie
		const authHeader = req.headers.authorization;
		const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.cookies?.token;

		if (!token) {
			res.status(401).json({ error: 'Authentication required' });
			return;
		}

		// Verify token
		const decoded = jwt.verify(token, JWT_SECRET) as any;

		// Get user from database
		const userService = container.get<UserService>(TYPES.UserService);
		const user = await userService.getUserById(decoded.userId);

		if (!user) {
			res.status(401).json({ error: 'User not found or inactive' });
			return;
		}

		// Add user to request object
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Invalid or expired token' });
	}
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
	if (!req.user.isAdmin()) {
		res.status(403).json({ error: 'Admin access required' });
		return;
	}
	next();
};

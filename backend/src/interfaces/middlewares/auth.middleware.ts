import { User } from '@/domain/entities/user.entity';
import { AuthenticationError } from '@/domain/errors/app-error';
import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	passport.authenticate('jwt', { session: false }, (err: Error, user: User, info: any) => {
		if (err) {
			return next(new AuthenticationError(err.message));
		}

		if (!user) {
			return next(new AuthenticationError(info?.message || 'Authentication required'));
		}

		// Add user to request object
		req.user = user;
		next();
	})(req, res, next);
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
	if (!req.user?.isAdmin) {
		res.status(403).json({ error: 'Admin access required' });
		return;
	}
	next();
};

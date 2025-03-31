import rateLimit from 'express-rate-limit';
import type { Request, Response } from 'express';
import logger from '@/infrastructure/logger';

// Default rate limit options
const defaultOptions = {
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
	handler: (req: Request, res: Response) => {
		logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
		res.status(429).json({
			status: 'error',
			message: 'Too many requests, please try again later.',
		});
	},
};

// Create rate limiter with Redis store if available
export const createRateLimiter = (options = {}) => {
	const limiterOptions = {
		...defaultOptions,
		...options,
	};

	return rateLimit(limiterOptions);
};

export const apiLimiter = createRateLimiter();

export const createUserLimiter = createRateLimiter({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // 5 user creations per hour
});

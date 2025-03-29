import rateLimit from 'express-rate-limit';
import type { Request, Response } from 'express';
import logger from '@/infrastructure/logger';

// Default rate limit options
const defaultOptions = {
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: {
		status: 'error',
		message: 'Too many requests, please try again later.',
	},
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

// Specific rate limiters for different endpoints
export const authLimiter = createRateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // 10 login attempts per 15 minutes
	message: {
		status: 'error',
		message: 'Too many login attempts, please try again later.',
	},
});

export const apiLimiter = createRateLimiter();

export const createUserLimiter = createRateLimiter({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // 5 user creations per hour
});

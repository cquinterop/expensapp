import logger from '@/infrastructure/logger';
import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export class AppError extends Error {
	readonly statusCode: number;
	readonly status: string;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
	}
}

export const errorRequestHandler: ErrorRequestHandler = (
	err: AppError | Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});

		return;
	}

	// Programming or unknown errors
	logger.error(`Unexpected error: ${err}`);

	res.status(500).json({
		status: 'error',
		message: 'internal server error',
	});
};

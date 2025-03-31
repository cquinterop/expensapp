import { AppError } from '@/domain/errors/app-error';
import logger from '@/infrastructure/logger';
import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

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
			details: err?.details,
		});

		return;
	}

	// Programming or unknown errors
	logger.error(`Unexpected error: ${err}`);

	res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
};

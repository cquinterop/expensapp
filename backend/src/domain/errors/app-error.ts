import { ValidationArguments } from 'class-validator';

export class AppError extends Error {
	readonly statusCode;
	readonly status;
	readonly details?;

	constructor(message: string, statusCode: number, details?: ValidationArguments[]) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.details = details?.reduce(
			(acc, cur) => ({
				...acc,
				[cur.property]: Object.values(cur.constraints).join(', '),
			}),
			{},
		);
	}
}

export class ValidationError extends AppError {
	constructor(message: string, details?: any) {
		super(message, 400, details);
	}
}

export class AuthenticationError extends AppError {
	constructor(message = 'Authentication failed') {
		super(message, 401);
	}
}

export class AuthorizationError extends AppError {
	constructor(message = 'You do not have permission to perform this action') {
		super(message, 403);
	}
}

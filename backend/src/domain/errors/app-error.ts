export enum ErrorType {
	VALIDATION = 'VALIDATION_ERROR',
	AUTHENTICATION = 'AUTHENTICATION_ERROR',
	AUTHORIZATION = 'AUTHORIZATION_ERROR',
	NOT_FOUND = 'NOT_FOUND_ERROR',
	CONFLICT = 'CONFLICT_ERROR',
	INTERNAL = 'INTERNAL_ERROR',
	EXTERNAL_SERVICE = 'EXTERNAL_SERVICE_ERROR',
	BUSINESS_RULE = 'BUSINESS_RULE_ERROR',
}

export class AppError extends Error {
	public readonly type: ErrorType;
	public readonly statusCode: number;
	public readonly details?: any;

	constructor(
		message: string,
		type: ErrorType = ErrorType.INTERNAL,
		statusCode = 500,
		details?: any,
	) {
		super(message);
		this.type = type;
		this.statusCode = statusCode;
		this.details = details;
	}
}

export class ValidationError extends AppError {
	constructor(message: string, details?: any) {
		super(message, ErrorType.VALIDATION, 400, details);
	}
}

export class AuthenticationError extends AppError {
	constructor(message = 'Authentication failed') {
		super(message, ErrorType.AUTHENTICATION, 401);
	}
}

export class AuthorizationError extends AppError {
	constructor(message = 'You do not have permission to perform this action') {
		super(message, ErrorType.AUTHORIZATION, 403);
	}
}

export class NotFoundError extends AppError {
	constructor(entity: string, id?: string) {
		const message = id ? `${entity} with id ${id} not found` : `${entity} not found`;
		super(message, ErrorType.NOT_FOUND, 404);
	}
}

export class ConflictError extends AppError {
	constructor(message: string) {
		super(message, ErrorType.CONFLICT, 409);
	}
}

export class BusinessRuleError extends AppError {
	constructor(message: string) {
		super(message, ErrorType.BUSINESS_RULE, 422);
	}
}

export class ExternalServiceError extends AppError {
	constructor(service: string, message = 'External service error') {
		super(`${service}: ${message}`, ErrorType.EXTERNAL_SERVICE, 502);
	}
}

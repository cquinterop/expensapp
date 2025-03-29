export const TYPES = {
	// Repositories
	UserRepository: Symbol.for('UserRepository'),
	TenantRepository: Symbol.for('TenantRepository'),

	// Services
	AuthService: Symbol.for('AuthService'),
	UserService: Symbol.for('UserService'),
	TenantService: Symbol.for('TenantService'),

	// Controllers
	AuthController: Symbol.for('AuthController'),
	UserController: Symbol.for('UserController'),
	TenantController: Symbol.for('TenantController'),
};

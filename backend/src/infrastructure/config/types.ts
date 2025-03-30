export const TYPES = {
	// Repositories
	TenantRepository: Symbol.for('TenantRepository'),
	UserRepository: Symbol.for('UserRepository'),
	ExpenseRepository: Symbol.for('ExpenseRepository'),
	RegularExpenseRepository: Symbol.for('RegularExpenseRepository'),
	TravelExpenseRepository: Symbol.for('TravelExpenseRepository'),
	AccommodationDetailRepository: Symbol.for('AccommodationDetailRepository'),
	TransportationDetailRepository: Symbol.for('TransportationDetailRepository'),
	MileageExpenseRepository: Symbol.for('MileageExpenseRepository'),
	MileageRateRepository: Symbol.for('MileageRateRepository'),

	// Services
	AuthService: Symbol.for('AuthService'),
	ExpenseService: Symbol.for('ExpenseService'),
	TenantService: Symbol.for('TenantService'),
	UserService: Symbol.for('UserService'),
	MileageRateService: Symbol.for('MileageRateService'),

	// Controllers
	AuthController: Symbol.for('AuthController'),
	ExpenseController: Symbol.for('ExpenseController'),
	TenantController: Symbol.for('TenantController'),
	UserController: Symbol.for('UserController'),
	MileageRateController: Symbol.for('MileageRateController'),
	ReportController: Symbol.for('ReportController'),
};

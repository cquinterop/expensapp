import { Container } from 'inversify';
import { TYPES } from './types';

// Repositories
import type { TenantRepository } from '@/domain/repositories/tenant.repository';
import type { UserRepository } from '@/domain/repositories/user.repository';
import type { ExpenseRepository } from '@/domain/repositories/expense.repository';
import type { ReportRepository } from '@/domain/repositories/report.repository';
import type { RegularExpenseRepository } from '@/domain/repositories/regular-expense.repository';
import type { TravelExpenseRepository } from '@/domain/repositories/travel-expense.repository';
import type { AccommodationDetailRepository } from '@/domain/repositories/accommodation-detail.repository';
import type { TransportationDetailRepository } from '@/domain/repositories/transportation-detail.repository';
import type { MileageExpenseRepository } from '@/domain/repositories/mileage-expense.repository';
import type { MileageRateRepository } from '@/domain/repositories/mileage-rate.repository';

// Repository Implementations
import { UserRepositoryImpl } from '@/infrastructure/repositories/user.repository.impl';
import { TenantRepositoryImpl } from '@/infrastructure/repositories/tenant.repository.impl';
import { ExpenseRepositoryImpl } from '@/infrastructure/repositories/expense.repository.impl';
import { ReportRepositoryImpl } from '@/infrastructure/repositories/report.repository.impl';
import { RegularExpenseRepositoryImpl } from '@/infrastructure/repositories/regular-expense.repository.impl';
import { TravelExpenseRepositoryImpl } from '@/infrastructure/repositories/travel-expense.repository.impl';
import { AccommodationDetailRepositoryImpl } from '@/infrastructure/repositories/accommodation-detail.repository.impl';
import { TransportationDetailRepositoryImpl } from '@/infrastructure/repositories/transportation-detail.repository.impl';
import { MileageExpenseRepositoryImpl } from '@/infrastructure/repositories/mileage-expense.repository.impl';
import { MileageRateRepositoryImpl } from '@/infrastructure/repositories/mileage-rate.repository.impl';

// Services
import type { AuthService } from '@/domain/services/auth.service';
import type { ExpenseService } from '@/domain/services/expense.service';
import type { ReportService } from '@/domain/services/report.service';
import type { TenantService } from '@/domain/services/tenant.service';
import type { UserService } from '@/domain/services/user.service';
import type { MileageRateService } from '@/domain/services/mileage-rate.service';

// Service Implementations
import { AuthServiceImpl } from '@/application/services/auth.service.impl';
import { ExpenseServiceImpl } from '@/application/services/expense.service.impl';
import { ReportServiceImpl } from '@/application/services/report.service.impl';
import { TenantServiceImpl } from '@/application/services/tenant.service.impl';
import { UserServiceImpl } from '@/application/services/user.service.impl';
import { MileageRateServiceImpl } from '@/application/services/mileage-rate.service.impl';

// Controllers
import { AuthController } from '@/interfaces/controllers/auth.controller';
import { ExpenseController } from '@/interfaces/controllers/expense.controller';
import { TenantController } from '@/interfaces/controllers/tenant.controller';
import { UserController } from '@/interfaces/controllers/user.controller';
import { MileageRateController } from '@/interfaces/controllers/mileage-rate.controller';
import { ReportController } from '@/interfaces/controllers/report.controller';

const container = new Container();

// Register repositories
container.bind<TenantRepository>(TYPES.TenantRepository).to(TenantRepositoryImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<ExpenseRepository>(TYPES.ExpenseRepository).to(ExpenseRepositoryImpl);
container
	.bind<RegularExpenseRepository>(TYPES.RegularExpenseRepository)
	.to(RegularExpenseRepositoryImpl);
container
	.bind<TravelExpenseRepository>(TYPES.TravelExpenseRepository)
	.to(TravelExpenseRepositoryImpl);
container
	.bind<AccommodationDetailRepository>(TYPES.AccommodationDetailRepository)
	.to(AccommodationDetailRepositoryImpl);
container
	.bind<TransportationDetailRepository>(TYPES.TransportationDetailRepository)
	.to(TransportationDetailRepositoryImpl);
container
	.bind<MileageExpenseRepository>(TYPES.MileageExpenseRepository)
	.to(MileageExpenseRepositoryImpl);
container.bind<MileageRateRepository>(TYPES.MileageRateRepository).to(MileageRateRepositoryImpl);
container.bind<ReportRepository>(TYPES.ReportRepository).to(ReportRepositoryImpl);

// Register services
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl);
container.bind<ExpenseService>(TYPES.ExpenseService).to(ExpenseServiceImpl);
container.bind<TenantService>(TYPES.TenantService).to(TenantServiceImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<MileageRateService>(TYPES.MileageRateService).to(MileageRateServiceImpl);
container.bind<ReportService>(TYPES.ReportService).to(ReportServiceImpl);

// Register controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<ExpenseController>(TYPES.ExpenseController).to(ExpenseController);
container.bind<TenantController>(TYPES.TenantController).to(TenantController);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<MileageRateController>(TYPES.MileageRateController).to(MileageRateController);
container.bind<ReportController>(TYPES.ReportController).to(ReportController);

export { container };

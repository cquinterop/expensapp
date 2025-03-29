import { Container } from 'inversify';
import { TYPES } from './types';

// Repositories
import type { UserRepository } from '@/domain/repositories/user.repository';
import type { TenantRepository } from '@/domain/repositories/tenant.repository';

// Repository Implementations
import { UserRepositoryImpl } from '@/infrastructure/repositories/user.repository.impl';
import { TenantRepositoryImpl } from '@/infrastructure/repositories/tenant.repository.impl';

// Services
import type { AuthService } from '@/domain/services/auth.service';
import type { UserService } from '@/domain/services/user.service';
import type { TenantService } from '@/domain/services/tenant.service';

// Service Implementations
import { AuthServiceImpl } from '@/application/services/auth.service.impl';
import { UserServiceImpl } from '@/application/services/user.service.impl';
import { TenantServiceImpl } from '@/application/services/tenant.service.impl';

// Controllers
import { AuthController } from '@/interfaces/controllers/auth.controller';
import { UserController } from '@/interfaces/controllers/user.controller';
import { TenantController } from '@/interfaces/controllers/tenant.controller';

const container = new Container();

// Register repositories
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<TenantRepository>(TYPES.TenantRepository).to(TenantRepositoryImpl);

// Register services
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<TenantService>(TYPES.TenantService).to(TenantServiceImpl);

// Register controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<TenantController>(TYPES.TenantController).to(TenantController);

export { container };

import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { TenantService } from '@/domain/services/tenant.service';
import { Tenant } from '@/domain/entities/tenant.entity';
import { TenantRepository } from '@/domain/repositories/tenant.repository';
import { TYPES } from '@/infrastructure/config/types';
import { AppError } from '@/domain/errors/app-error';

@injectable()
export class TenantServiceImpl implements TenantService {
	constructor(
		@inject(TYPES.TenantRepository) private readonly tenantRepository: TenantRepository,
	) {}

	async createTenant(name: string): Promise<Tenant> {
		const existingTenant = await this.tenantRepository.findByName(name);
		if (existingTenant) {
			throw new AppError('Tenant with this name already exists', 409);
		}

		const tenant = new Tenant(uuidv4(), name);
		return this.tenantRepository.create(tenant);
	}

	async getTenantById(id: string): Promise<Tenant> {
		const tenant = await this.tenantRepository.findById(id);
		if (!tenant) {
			throw new AppError('Tenant not found', 404);
		}

		return tenant;
	}

	async getAllTenants() {
		return this.tenantRepository.findAll();
	}

	async updateTenant(id: string, data: Partial<Tenant>) {
		const tenant = await this.tenantRepository.findById(id);
		if (!tenant) {
			throw new AppError('Tenant not found', 404);
		}

		Object.assign(tenant, data);
		tenant.updatedAt = new Date();

		return this.tenantRepository.update(tenant);
	}

	async deleteTenant(id: string) {
		const tenant = await this.tenantRepository.findById(id);
		if (!tenant) {
			throw new AppError('Tenant not found', 404);
		}

		return this.tenantRepository.delete(id);
	}
}

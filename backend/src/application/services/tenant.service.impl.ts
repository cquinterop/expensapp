import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { TenantService } from '@/domain/services/tenant.service';
import { Tenant } from '@/domain/entities/tenant.entity';
import { TenantRepository } from '@/domain/repositories/tenant.repository';
import { TYPES } from '@/infrastructure/config/types';

@injectable()
export class TenantServiceImpl implements TenantService {
	constructor(@inject(TYPES.TenantRepository) private tenantRepository: TenantRepository) {}

	async createTenant(name: string): Promise<Tenant> {
		// Check if tenant with same name already exists
		const existingTenant = await this.tenantRepository.findByName(name);
		if (existingTenant) {
			throw new Error('Tenant with this name already exists');
		}

		// Create new tenant
		const tenant = new Tenant(uuidv4(), name);
		return this.tenantRepository.create(tenant);
	}

	async getTenantById(id: string): Promise<Tenant> {
		const tenant = await this.tenantRepository.findById(id);
		if (!tenant) {
			throw new Error('Tenant not found');
		}
		return tenant;
	}

	async getAllTenants(): Promise<Tenant[]> {
		return this.tenantRepository.findAll();
	}

	async updateTenant(id: string, data: Partial<Tenant>): Promise<Tenant> {
		const tenant = await this.tenantRepository.findById(id);
		if (!tenant) {
			throw new Error('Tenant not found');
		}

		// Update tenant
		Object.assign(tenant, data);
		tenant.updatedAt = new Date();

		return this.tenantRepository.update(tenant);
	}

	async deleteTenant(id: string): Promise<boolean> {
		const tenant = await this.tenantRepository.findById(id);
		if (!tenant) {
			throw new Error('Tenant not found');
		}

		return this.tenantRepository.delete(id);
	}
}

import { injectable } from 'inversify';
import type { TenantRepository } from '@/domain/repositories/tenant.repository';
import { Tenant } from '@/domain/entities/tenant.entity';
import { TenantModel } from '@/infrastructure/database/models/tenant.model';

@injectable()
export class TenantRepositoryImpl implements TenantRepository {
	async findByName(name: string): Promise<Tenant | null> {
		const tenantModel = await TenantModel.findOne({ where: { name } });
		if (!tenantModel) {
			return null;
		}

		return this.mapModelToEntity(tenantModel);
	}

	async findById(id: string): Promise<Tenant | null> {
		const tenantModel = await TenantModel.findByPk(id);
		if (!tenantModel) {
			return null;
		}

		return this.mapModelToEntity(tenantModel);
	}

	async findAll(): Promise<Tenant[]> {
		const tenantModels = await TenantModel.findAll();
		return tenantModels.map(this.mapModelToEntity);
	}

	async create(tenant: Tenant): Promise<Tenant> {
		const tenantModel = await TenantModel.create({
			id: tenant.id,
			name: tenant.name,
			balance: tenant.balance,
			isActive: tenant.isActive,
			createdAt: tenant.createdAt,
			updatedAt: tenant.updatedAt,
		});

		return this.mapModelToEntity(tenantModel);
	}

	async update(tenant: Tenant): Promise<Tenant> {
		const tenantModel = await TenantModel.findByPk(tenant.id);
		if (!tenantModel) {
			throw new Error('Tenant not found');
		}

		await tenantModel.update({
			name: tenant.name,
			balance: tenant.balance,
			isActive: tenant.isActive,
			updatedAt: new Date(),
		});

		return this.mapModelToEntity(tenantModel);
	}

	async delete(id: string): Promise<boolean> {
		const tenantModel = await TenantModel.findByPk(id);
		if (!tenantModel) {
			return false;
		}

		await tenantModel.destroy();
		return true;
	}

	private mapModelToEntity(model: TenantModel): Tenant {
		const tenant = new Tenant(
			model.id,
			model.name,
			Number.parseFloat(model.balance.toString()),
			model.isActive,
		);
		tenant.createdAt = model.createdAt;
		tenant.updatedAt = model.updatedAt;
		return tenant;
	}
}

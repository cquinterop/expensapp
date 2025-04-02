import { injectable } from 'inversify';
import type { TenantRepository } from '@/domain/repositories/tenant.repository';
import { Tenant } from '@/domain/entities/tenant.entity';
import { TenantModel } from '@/infrastructure/database/models/tenant.model';
import sequelize from '../database/config/database';
import { Transaction } from 'sequelize';
import { AppError } from '@/domain/errors/app-error';

@injectable()
export class TenantRepositoryImpl implements TenantRepository {
	async findByName(name: string) {
		const tenantModel = await TenantModel.findOne({ where: { name } });
		if (!tenantModel) {
			return null;
		}

		return this.mapModelToEntity(tenantModel);
	}

	async findById(id: string) {
		const tenantModel = await TenantModel.findByPk(id);
		if (!tenantModel) {
			return null;
		}

		return this.mapModelToEntity(tenantModel);
	}

	async findAll() {
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

	async update(tenant: Tenant) {
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

	async delete(id: string) {
		const tenantModel = await TenantModel.findByPk(id);
		if (!tenantModel) {
			return false;
		}

		await tenantModel.destroy();
		return true;
	}

	async updateBalanceWithLock(tenantId: string, amount: number) {
		const transaction = await sequelize.transaction({
			isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
		});

		try {
			const tenantModel = await TenantModel.findByPk(tenantId, {
				lock: transaction.LOCK.UPDATE,
				transaction,
			});

			if (!tenantModel) {
				await transaction.rollback();
				throw new AppError('Tenant not found', 404);
			}

			const currentBalance = Number.parseFloat(tenantModel.balance.toString());
			const newBalance = currentBalance + amount;

			// Ensure balance doesn't go negative if that's a business rule
			if (newBalance < 0) {
				await transaction.rollback();
				throw new AppError('Insufficient balance', 402);
			}

			await tenantModel.update(
				{
					balance: newBalance,
					updatedAt: new Date(),
				},
				{ transaction },
			);

			await transaction.commit();

			return this.mapModelToEntity(tenantModel);
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	private mapModelToEntity(model: TenantModel) {
		const tenant = new Tenant(model.id, model.name, Number(model.balance), model.isActive);
		tenant.createdAt = model.createdAt;
		tenant.updatedAt = model.updatedAt;

		return tenant;
	}
}

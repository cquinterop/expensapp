import { injectable } from 'inversify';
import type { UserRepository } from '@/domain/repositories/user.repository';
import { User, type UserRole } from '@/domain/entities/user.entity';
import { UserModel } from '@/infrastructure/database/models/user.model';
import { TenantModel } from '@/infrastructure/database/models/tenant.model';
import { AppError } from '@/domain/errors/app-error';

@injectable()
export class UserRepositoryImpl implements UserRepository {
	async findById(id: string) {
		const userModel = await UserModel.findByPk(id, {
			include: [{ model: TenantModel }],
		});

		if (!userModel) {
			return null;
		}

		return this.mapModelToEntity(userModel);
	}

	async findByEmail(email: string) {
		const userModel = await UserModel.findOne({ where: { email } });
		if (!userModel) {
			return null;
		}

		return this.mapModelToEntity(userModel);
	}

	async findByTenantId(tenantId: string) {
		const userModels = await UserModel.findAll({ where: { tenantId } });
		return userModels.map(this.mapModelToEntity);
	}

	async create(user: User) {
		const userModel = await UserModel.create({
			id: user.id,
			tenantId: user.tenantId,
			email: user.email,
			fullName: user.fullName,
			passwordHash: user.passwordHash,
			role: user.role,
			isActive: user.isActive,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});

		return this.mapModelToEntity(userModel);
	}

	async update(user: User) {
		const userModel = await UserModel.findByPk(user.id);
		if (!userModel) {
			throw new AppError('User not found', 404);
		}

		await userModel.update({
			email: user.email,
			fullName: user.fullName,
			passwordHash: user.passwordHash,
			role: user.role,
			isActive: user.isActive,
			updatedAt: new Date(),
		});

		return this.mapModelToEntity(userModel);
	}

	async delete(id: string) {
		const userModel = await UserModel.findByPk(id);
		if (!userModel) {
			return false;
		}

		await userModel.destroy();

		return true;
	}

	private mapModelToEntity(model: UserModel) {
		const user = new User(
			model.id,
			model.tenantId,
			model.email,
			model.fullName,
			model.passwordHash,
			model.role as UserRole,
			model.isActive,
		);
		user.tenantName = model.tenant?.name;
		user.createdAt = model.createdAt;
		user.updatedAt = model.updatedAt;

		return user;
	}
}

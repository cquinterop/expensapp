import { injectable } from 'inversify';
import type { UserRepository } from '@/domain/repositories/user.repository';
import { User, type UserRole } from '@/domain/entities/user.entity';
import { UserModel } from '@/infrastructure/database/models/user.model';

@injectable()
export class UserRepositoryImpl implements UserRepository {
	async findById(id: string): Promise<User | null> {
		const userModel = await UserModel.findByPk(id);
		if (!userModel) {
			return null;
		}

		return this.mapModelToEntity(userModel);
	}

	async findByEmail(email: string): Promise<User | null> {
		const userModel = await UserModel.findOne({ where: { email } });
		if (!userModel) {
			return null;
		}

		return this.mapModelToEntity(userModel);
	}

	async findByTenantId(tenantId: string): Promise<User[]> {
		const userModels = await UserModel.findAll({ where: { tenantId } });
		return userModels.map(this.mapModelToEntity);
	}

	async create(user: User): Promise<User> {
		const userModel = await UserModel.create({
			id: user.id,
			tenantId: user.tenantId,
			email: user.email,
			firstName: user.fullName,
			passwordHash: user.passwordHash,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});

		return this.mapModelToEntity(userModel);
	}

	async update(user: User): Promise<User> {
		const userModel = await UserModel.findByPk(user.id);
		if (!userModel) {
			throw new Error('User not found');
		}

		await userModel.update({
			email: user.email,
			firstName: user.fullName,
			passwordHash: user.passwordHash,
			role: user.role,
			updatedAt: new Date(),
		});

		return this.mapModelToEntity(userModel);
	}

	async delete(id: string): Promise<boolean> {
		const userModel = await UserModel.findByPk(id);
		if (!userModel) {
			return false;
		}

		await userModel.destroy();
		return true;
	}

	private mapModelToEntity(model: UserModel): User {
		const user = new User(
			model.id,
			model.tenantId,
			model.email,
			model.fullName,
			model.passwordHash,
			model.role as UserRole,
		);
		user.createdAt = model.createdAt;
		user.updatedAt = model.updatedAt;
		return user;
	}
}

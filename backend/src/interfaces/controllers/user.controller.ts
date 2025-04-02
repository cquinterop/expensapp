import type { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import type { UserService } from '@/domain/services/user.service';
import { TYPES } from '@/infrastructure/config/types';
import { User } from '@/domain/entities/user.entity';
import { AuthorizationError } from '@/domain/errors/app-error';

@injectable()
export class UserController {
	constructor(@inject(TYPES.UserService) private readonly userService: UserService) {}

	async getUsersByTenantId(req: Request, res: Response, next: NextFunction) {
		try {
			const { tenantId } = req.user as User;
			const users = await this.userService.getUsersByTenantId(tenantId);
			const usersByTenantId = users.map((user) => ({
				id: user.id,
				email: user.email,
				fullName: user.fullName,
				role: user.role,
				isActive: user.isActive,
			}));

			res.status(200).json(usersByTenantId);
		} catch (error) {
			next(error);
		}
	}

	async getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const user = await this.userService.getUserById(id);
			const { tenantId } = req.user as User;

			if (user.tenantId !== tenantId) {
				throw new AuthorizationError('Access denied');
			}

			res.status(200).json({
				id: user.id,
				email: user.email,
				fullName: user.fullName,
				role: user.role,
				isActive: user.isActive,
				tenantId: user.tenantId,
			});
		} catch (error) {
			next(error);
		}
	}

	async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const user = await this.userService.getUserById(id);
			const { tenantId, isAdmin } = req.user as User;

			if (!isAdmin) {
				throw new AuthorizationError('Admin access required');
			}

			if (user.tenantId !== tenantId) {
				throw new AuthorizationError('Access denied');
			}

			const updatedUser = await this.userService.updateUser(id, req.body);

			res.status(200).json({
				id: updatedUser.id,
				email: updatedUser.email,
				fullName: updatedUser.fullName,
				role: updatedUser.role,
				isActive: user.isActive,
			});
		} catch (error) {
			next(error);
		}
	}

	async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const user = await this.userService.getUserById(id);
			const { tenantId, isAdmin, id: userId } = req.user as User;

			if (!isAdmin) {
				throw new AuthorizationError('Admin access required');
			}

			if (user.tenantId !== tenantId) {
				throw new AuthorizationError('Access denied');
			}

			if (id === userId) {
				throw new AuthorizationError('Users cannot delete themselves');
			}

			await this.userService.deleteUser(id);

			res.status(204).send();
		} catch (error) {
			next(error);
		}
	}
}

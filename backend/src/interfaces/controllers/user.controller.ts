import type { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import type { UserService } from '@/domain/services/user.service';
import { TYPES } from '@/infrastructure/config/types';

@injectable()
export class UserController {
	constructor(@inject(TYPES.UserService) private readonly userService: UserService) {}

	async getUsersByTenantId(req: Request, res: Response): Promise<void> {
		try {
			// Users can only access users from their own tenant
			const tenantId = req.user?.tenantId;

			const users = await this.userService.getUsersByTenantId(tenantId);
			res.status(200).json(
				users.map((user) => ({
					id: user.id,
					email: user.email,
					fullName: user.fullName,
					role: user.role,
				})),
			);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}

	async getUserById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const user = await this.userService.getUserById(id);

			// Users can only access users from their own tenant
			if (user.tenantId !== req.user?.tenantId) {
				res.status(403).json({ error: 'Access denied' });
				return;
			}

			res.status(200).json({
				id: user.id,
				email: user.email,
				fullName: user.fullName,
				role: user.role,
				tenantId: user.tenantId,
			});
		} catch (error) {
			res.status(404).json({ error: (error as Error).message });
		}
	}
}

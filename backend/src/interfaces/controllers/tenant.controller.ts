import type { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import type { TenantService } from '@/domain/services/tenant.service';
import { TYPES } from '@/infrastructure/config/types';
import { AuthorizationError } from '@/domain/errors/app-error';
import { User } from '@/domain/entities/user.entity';

@injectable()
export class TenantController {
	constructor(@inject(TYPES.TenantService) private readonly tenantService: TenantService) {}

	async getAllTenants(req: Request, res: Response, next: NextFunction) {
		try {
			const { isAdmin } = req.user as User;

			if (!isAdmin) {
				throw new AuthorizationError('Access denied');
			}

			const tenants = await this.tenantService.getAllTenants();
			res.status(200).json(tenants);
		} catch (error) {
			next(error);
		}
	}

	async getTenantById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { tenantId } = req.user as User;

			if (id !== tenantId) {
				throw new AuthorizationError('Users can only access their own tenant');
			}

			const tenant = await this.tenantService.getTenantById(id);
			res.status(200).json(tenant);
		} catch (error) {
			next(error);
		}
	}

	async updateTenant(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { isAdmin, tenantId } = req.user as User;

			if (!isAdmin) {
				throw new AuthorizationError('Admin access required');
			}

			if (id !== tenantId) {
				throw new AuthorizationError('Access denied');
			}

			const tenant = await this.tenantService.updateTenant(id, req.body);
			res.status(200).json(tenant);
		} catch (error) {
			next(error);
		}
	}

	async deleteTenant(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { isAdmin } = req.user as User;

			if (!isAdmin) {
				throw new AuthorizationError('Admin access required');
			}

			await this.tenantService.deleteTenant(id);
			res.status(204).send();
		} catch (error) {
			next(error);
		}
	}
}

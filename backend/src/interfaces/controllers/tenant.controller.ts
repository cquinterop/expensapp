import type { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import type { TenantService } from '@/domain/services/tenant.service';
import { TYPES } from '@/infrastructure/config/types';

@injectable()
export class TenantController {
	constructor(@inject(TYPES.TenantService) private readonly tenantService: TenantService) {}

	async getAllTenants(req: Request, res: Response): Promise<void> {
		try {
			// Only super admins can list all tenants
			if (!req.user?.isAdmin) {
				res.status(403).json({ error: 'Super admin access required' });
				return;
			}

			const tenants = await this.tenantService.getAllTenants();
			res.status(200).json(tenants);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}

	async getTenantById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			// Users can only access their own tenant
			if (id !== req.user?.tenantId) {
				res.status(403).json({ error: 'Access denied' });
				return;
			}

			const tenant = await this.tenantService.getTenantById(id);
			res.status(200).json(tenant);
		} catch (error) {
			res.status(404).json({ error: (error as Error).message });
		}
	}

	async updateTenant(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			// Only admins can update tenant details
			if (!req.user?.isAdmin) {
				res.status(403).json({ error: 'Admin access required' });
				return;
			}

			// Users can only update their own tenant
			if (id !== req.user?.tenantId) {
				res.status(403).json({ error: 'Access denied' });
				return;
			}

			const tenant = await this.tenantService.updateTenant(id, req.body);
			res.status(200).json(tenant);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}

	async deleteTenant(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			// Only super admins can delete tenants
			if (!req.user?.isAdmin) {
				res.status(403).json({ error: 'Super admin access required' });
				return;
			}

			await this.tenantService.deleteTenant(id);
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}
}

import { Tenant } from '@/domain/entities/tenant.entity';

export interface TenantService {
	createTenant(name: string): Promise<Tenant>;
	getTenantById(id: string): Promise<Tenant>;
	getAllTenants(): Promise<Tenant[]>;
	updateTenant(id: string, data: Partial<Tenant>): Promise<Tenant>;
	deleteTenant(id: string): Promise<boolean>;
}

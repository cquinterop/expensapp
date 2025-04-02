import { Tenant } from '@/domain/entities/tenant.entity';

export interface TenantRepository {
	findById(id: string): Promise<Tenant | null>;
	findByName(name: string): Promise<Tenant | null>;
	findAll(): Promise<Tenant[]>;
	create(tenant: Tenant): Promise<Tenant>;
	update(tenant: Tenant): Promise<Tenant>;
	delete(id: string): Promise<boolean>;
	updateBalanceWithLock(id: string, amount: number): Promise<Tenant>;
}

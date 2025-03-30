import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TenantModel } from '@/infrastructure/database/models/tenant.model';

@Table({
	tableName: 'mileage_rates',
	timestamps: true,
})
export class MileageRateModel extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		allowNull: false,
	})
	declare id: string;

	@ForeignKey(() => TenantModel)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	declare tenantId: string;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
	})
	declare rate: number;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	declare effectiveDate: Date;

	@BelongsTo(() => TenantModel)
	declare tenant: TenantModel;
}

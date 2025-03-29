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
	tenantId!: string;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
	})
	rate!: number;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	effectiveDate!: Date;

	@BelongsTo(() => TenantModel)
	tenant!: TenantModel;
}

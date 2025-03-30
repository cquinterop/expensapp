import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserModel } from '@/infrastructure/database/models/user.model';
import { ExpenseModel } from '@/infrastructure/database/models/expense.model';
import { MileageRateModel } from '@/infrastructure/database/models/mileage-rate.model';

@Table({
	tableName: 'tenants',
	timestamps: true,
})
export class TenantModel extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		allowNull: false,
	})
	declare id: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare name: string;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
		defaultValue: 0,
	})
	declare balance: number;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	declare isActive: boolean;

	@HasMany(() => UserModel)
	declare users: UserModel[];

	@HasMany(() => ExpenseModel)
	declare expenses: ExpenseModel[];

	@HasMany(() => MileageRateModel)
	declare mileageRates: MileageRateModel[];
}

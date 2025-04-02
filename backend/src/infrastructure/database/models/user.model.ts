import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	HasMany,
} from 'sequelize-typescript';
import { TenantModel } from '@/infrastructure/database/models/tenant.model';
import { ExpenseModel } from '@/infrastructure/database/models/expense.model';

@Table({
	tableName: 'users',
	timestamps: true,
})
export class UserModel extends Model {
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
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	declare email: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare fullName: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare passwordHash: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: 'employee',
	})
	declare role: string;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	declare isActive: boolean;

	@BelongsTo(() => TenantModel)
	declare tenant: TenantModel;

	@HasMany(() => ExpenseModel)
	declare expenses: ExpenseModel[];

	@HasMany(() => ExpenseModel, 'processedBy')
	declare processedExpenses: ExpenseModel[];
}

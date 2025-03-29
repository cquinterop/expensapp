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
	tenantId!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	email!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	fullName!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	passwordHash!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: 'employee',
	})
	role!: string;

	@BelongsTo(() => TenantModel)
	tenant!: TenantModel;

	@HasMany(() => ExpenseModel)
	expenses!: ExpenseModel[];

	@HasMany(() => ExpenseModel, 'processedBy')
	processedExpenses!: ExpenseModel[];
}

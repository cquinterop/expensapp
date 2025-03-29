import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	HasOne,
} from 'sequelize-typescript';
import { TenantModel } from '@/infrastructure/database/models/tenant.model';
import { UserModel } from '@/infrastructure/database/models/user.model';
import { RegularExpenseModel } from '@/infrastructure/database/models/regular-expense.model';
import { TravelExpenseModel } from '@/infrastructure/database/models/travel-expense.model';
import { MileageExpenseModel } from '@/infrastructure/database/models/mileage-expense.model';

@Table({
	tableName: 'expenses',
	timestamps: true,
})
export class ExpenseModel extends Model {
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

	@ForeignKey(() => UserModel)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	userId!: string;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
	})
	amount!: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	description!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	expenseType!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: 'pending',
	})
	status!: string;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	submittedAt!: Date;

	@Column({
		type: DataType.DATE,
		allowNull: true,
	})
	processedAt!: Date | null;

	@ForeignKey(() => UserModel)
	@Column({
		type: DataType.UUID,
		allowNull: true,
	})
	processedBy!: string | null;

	@BelongsTo(() => TenantModel)
	tenant!: TenantModel;

	@BelongsTo(() => UserModel)
	user!: UserModel;

	@BelongsTo(() => UserModel, 'processedBy')
	processor!: UserModel;

	@HasOne(() => RegularExpenseModel)
	regularExpense!: RegularExpenseModel;

	@HasOne(() => TravelExpenseModel)
	travelExpense!: TravelExpenseModel;

	@HasOne(() => MileageExpenseModel)
	mileageExpense!: MileageExpenseModel;
}

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
	declare tenantId: string;

	@ForeignKey(() => UserModel)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	declare userId: string;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
	})
	declare amount: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare description: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare expenseType: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: 'pending',
	})
	declare status: string;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	declare submittedAt: Date;

	@Column({
		type: DataType.DATE,
		allowNull: true,
	})
	declare processedAt: Date | null;

	@ForeignKey(() => UserModel)
	@Column({
		type: DataType.UUID,
		allowNull: true,
	})
	declare processedBy: string | null;

	@BelongsTo(() => TenantModel)
	declare tenant: TenantModel;

	@BelongsTo(() => UserModel, { foreignKey: 'userId', as: 'user' })
	declare user: UserModel;

	@BelongsTo(() => UserModel)
	declare processor: UserModel;

	@HasOne(() => RegularExpenseModel)
	declare regularExpense: RegularExpenseModel;

	@HasOne(() => TravelExpenseModel)
	declare travelExpense: TravelExpenseModel;

	@HasOne(() => MileageExpenseModel)
	declare mileageExpense: MileageExpenseModel;
}

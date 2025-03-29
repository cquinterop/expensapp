import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ExpenseModel } from '@/infrastructure/database/models/expense.model';

@Table({
	tableName: 'mileage_expenses',
	timestamps: true,
})
export class MileageExpenseModel extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		allowNull: false,
	})
	declare id: string;

	@ForeignKey(() => ExpenseModel)
	@Column({
		type: DataType.UUID,
		allowNull: false,
		unique: true,
	})
	expenseId!: string;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
	})
	distanceKm!: number;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
	})
	ratePerKm!: number;

	@BelongsTo(() => ExpenseModel)
	expense!: ExpenseModel;
}

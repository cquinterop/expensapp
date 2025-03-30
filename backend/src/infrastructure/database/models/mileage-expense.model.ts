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
	declare expenseId: string;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
	})
	declare distanceKm: number;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
	})
	declare ratePerKm: number;

	@BelongsTo(() => ExpenseModel)
	declare expense: ExpenseModel;
}

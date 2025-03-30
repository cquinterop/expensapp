import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ExpenseModel } from '@/infrastructure/database/models/expense.model';

@Table({
	tableName: 'regular_expenses',
	timestamps: true,
})
export class RegularExpenseModel extends Model {
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
		type: DataType.STRING,
		allowNull: false,
	})
	declare receiptUrl: string;

	@BelongsTo(() => ExpenseModel)
	declare expense: ExpenseModel;
}

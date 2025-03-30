import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TravelExpenseModel } from '@/infrastructure/database/models/travel-expense.model';

@Table({
	tableName: 'transportation_details',
	timestamps: true,
})
export class TransportationDetailModel extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		allowNull: false,
	})
	declare id: string;

	@ForeignKey(() => TravelExpenseModel)
	@Column({
		type: DataType.UUID,
		allowNull: false,
		unique: true,
	})
	declare travelExpenseId: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare transportationMode: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	route!: string;

	@BelongsTo(() => TravelExpenseModel)
	declare travelExpense: TravelExpenseModel;
}

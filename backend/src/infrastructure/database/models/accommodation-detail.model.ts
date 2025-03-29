import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TravelExpenseModel } from '@/infrastructure/database/models/travel-expense.model';

@Table({
	tableName: 'accommodation_details',
	timestamps: true,
})
export class AccommodationDetailModel extends Model {
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
	travelExpenseId!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	hotelName!: string;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	checkInDate!: Date;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	checkOutDate!: Date;

	@BelongsTo(() => TravelExpenseModel)
	travelExpense!: TravelExpenseModel;
}

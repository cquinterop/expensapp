import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	HasOne,
} from 'sequelize-typescript';
import { ExpenseModel } from '@/infrastructure/database/models/expense.model';
import { AccommodationDetailModel } from '@/infrastructure/database/models/accommodation-detail.model';
import { TransportationDetailModel } from '@/infrastructure/database/models/transportation-detail.model';

@Table({
	tableName: 'travel_expenses',
	timestamps: true,
})
export class TravelExpenseModel extends Model {
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
		type: DataType.STRING,
		allowNull: false,
	})
	travelSubtype!: string;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	startDate!: Date;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	endDate!: Date;

	@BelongsTo(() => ExpenseModel)
	expense!: ExpenseModel;

	@HasOne(() => AccommodationDetailModel)
	accommodationDetail!: AccommodationDetailModel;

	@HasOne(() => TransportationDetailModel)
	transportationDetail!: TransportationDetailModel;
}

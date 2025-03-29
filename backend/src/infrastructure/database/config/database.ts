import { Sequelize } from 'sequelize-typescript';
import { TenantModel } from '@/infrastructure/database/models/tenant.model';
import { UserModel } from '@/infrastructure/database/models/user.model';
import { ExpenseModel } from '@/infrastructure/database/models/expense.model';
import { RegularExpenseModel } from '@/infrastructure/database/models/regular-expense.model';
import { TravelExpenseModel } from '@/infrastructure/database/models/travel-expense.model';
import { AccommodationDetailModel } from '@/infrastructure/database/models/accommodation-detail.model';
import { TransportationDetailModel } from '@/infrastructure/database/models/transportation-detail.model';
import { MileageExpenseModel } from '@/infrastructure/database/models/mileage-expense.model';
import { MileageRateModel } from '@/infrastructure/database/models/mileage-rate.model';
import logger from '@/infrastructure/logger';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '@/infrastructure/config/env';

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: DB_HOST,
	port: Number(DB_PORT),
	database: DB_NAME,
	username: DB_USER,
	password: DB_PASSWORD,
	logging: (msg) => logger.debug(msg),
	models: [
		TenantModel,
		UserModel,
		ExpenseModel,
		RegularExpenseModel,
		TravelExpenseModel,
		AccommodationDetailModel,
		TransportationDetailModel,
		MileageExpenseModel,
		MileageRateModel,
	],
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

export default sequelize;

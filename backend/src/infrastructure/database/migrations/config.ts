import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '@/infrastructure/config/env';
import logger from '@/infrastructure/logger';

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: DB_HOST,
	port: Number(DB_PORT),
	database: DB_NAME,
	username: DB_USER,
	password: DB_PASSWORD,
	logging: (msg) => logger.debug(msg),
});

export default sequelize;

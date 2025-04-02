import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '@/infrastructure/swagger/swagger.json';
import sequelize from '@/infrastructure/database/config/database';

import logger from '@/infrastructure/logger';
import { configurePassport } from '@/infrastructure/auth/passport';
import { errorRequestHandler } from './interfaces/middlewares/error.middleware';

import authRoutes from '@/interfaces/routes/auth.routes';
import userRoutes from '@/interfaces/routes/user.routes';
import expenseRoutes from '@/interfaces/routes/expense.routes';
import { apiLimiter } from '@/interfaces/middlewares/rate-limit.middleware';
import { CORS_ORIGIN, JWT_SECRET, NODE_ENV, PORT } from '@/infrastructure/config/env';

const app = express();
const passport = configurePassport();

// Middleware
app.use(
	cors({
		origin: CORS_ORIGIN,
		credentials: true,
	}),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(JWT_SECRET));
app.use(morgan('dev'));

// Session configuration for OAuth
app.use(
	session({
		secret: JWT_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: NODE_ENV === 'production',
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		},
	}),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// API routes
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/expenses', expenseRoutes);

app.use('/api', apiRouter);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling
app.use(errorRequestHandler);

// Database connection and server startup
const startServer = async () => {
	try {
		await sequelize.authenticate();
		logger.info('Database connection established successfully');

		app.listen(PORT, () => {
			logger.info(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		logger.error(`Unable to connect to the database: ${error}`);
		process.exit(1);
	}
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
	logger.error('UNHANDLED REJECTION! Shutting down...', err);
	process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
	logger.error('UNCAUGHT EXCEPTION! Shutting down...', err);
	process.exit(1);
});

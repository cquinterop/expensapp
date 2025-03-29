import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';

import logger from '@/infrastructure/logger';
import { configurePassport } from '@/infrastructure/auth/passport';
import { fileURLToPath } from 'url';
import { errorRequestHandler } from './interfaces/middlewares/error.middleware';

const SECRET = process.env.SECRET || 'session_key';

// Load environment variables
dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') });

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Passport
const passport = configurePassport();

// Middleware
app.use(
	cors({
		origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
		credentials: true,
	}),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(SECRET));
app.use(morgan('dev'));

// Session configuration for OAuth
app.use(
	session({
		secret: SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === 'production',
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		},
	}),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.send('Express + TypeScript Server');
});

// Error handling
app.use(errorRequestHandler);

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

app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}`);
});

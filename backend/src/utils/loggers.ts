import { pino, type Logger } from 'pino';

const logger: Logger = pino({
	level: process.env.LOG_LEVEL || 'info',
	transport: { target: 'pino-pretty', options: { colorize: true } },
});

export default logger;

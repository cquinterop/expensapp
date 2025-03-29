import { pino, type Logger } from 'pino';
import { LOG_LEVEL, NODE_ENV } from '../config/env';

const logger: Logger = pino({
	level: LOG_LEVEL,
	transport:
		NODE_ENV === 'development' ? { target: 'pino-pretty', options: { colorize: true } } : undefined,
});

export default logger;

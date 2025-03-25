import  express from 'express';
import logger from '@/utils/loggers'
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  logger.info(`Server is running ${port}`);
});

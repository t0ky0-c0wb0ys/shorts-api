import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './routes/router';
import config from '../config';

dotenv.config();

const app: Express = express();
const PORT = config.server.port;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on PORT: ${PORT}`);
});

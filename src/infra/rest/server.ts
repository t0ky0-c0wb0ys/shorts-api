import express, { Express, NextFunction, Response } from 'express';
import dotenv from 'dotenv';
import Ok from '../../adapters/ports/httpResponse/ok';
import { IHttpRequest } from '../../adapters/ports/httpRequest/httpRequest';
import { Payload } from '../../application/services/jwtService';
import AuthenticateController from '../../adapters/controllers/authenticate/authenticateController';
import publicRouter from './routes/publicRouter';
import config from '../config';

dotenv.config();

const app: Express = express();
const PORT = config.server.port;

app.use(express.json());
app.use(publicRouter);
app.use(async (req: IHttpRequest, res: Response, next: NextFunction) => {
  const authenticateController = new AuthenticateController();
  const controllerResponse = await authenticateController.handle(req);

  if (!(controllerResponse instanceof Ok)) {
    return res
      .status(controllerResponse.statusCode)
      .send(controllerResponse.body);
  }

  req.userId = (controllerResponse.body as Payload).id;

  return next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on PORT: ${PORT}`);
});

import express, { Request, Response, Router } from 'express';
import RegisterUserController from '../../../adapters/controllers/registerUser/registerUserController';
import LoginController from '../../../adapters/controllers/login/loginController';

const publicRouter: Router = express.Router();

publicRouter.post('/register', async (req: Request, res: Response) => {
  const registerUserController = new RegisterUserController();

  const controllerResponse = await registerUserController.handle({
    body: {
      username: req.body?.username,
      email: req.body?.email,
      password: req.body?.password,
    },
  });

  return res
    .status(controllerResponse.statusCode)
    .send(controllerResponse.body);
});

publicRouter.post('/login', async (req: Request, res: Response) => {
  const loginController = new LoginController();

  const controllerResponse = await loginController.handle({
    body: {
      username: req.body?.username,
      email: req.body?.email,
      password: req.body?.password,
    },
  });

  return res
    .status(controllerResponse.statusCode)
    .send(controllerResponse.body);
});

export default publicRouter;

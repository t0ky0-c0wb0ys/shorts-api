import express, { Request, Response, Router } from 'express';
import RegisterUserController from '../../../adapters/controllers/registerUser/registerUserController';

const router: Router = express.Router();

router.post('/users', async (req: Request, res: Response) => {
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

export default router;

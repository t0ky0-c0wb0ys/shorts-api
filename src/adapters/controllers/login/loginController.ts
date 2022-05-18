import { IJWTService } from '../../../application/services/jwtService';
import JWTService from '../../../infra/services/jwtService';
import Created from '../../ports/httpResponse/created';
import BadRequest from '../../ports/httpResponse/badRequest';
import ServerError from '../../ports/httpResponse/serverError';
import HttpResponse from '../../ports/httpResponse/httpResponse';
import PrismaUserRepository from '../../../infra/repositories/prisma/prismaUserRepository';
import { IHashService } from '../../../application/services/hashService';
import { IUserRepository } from '../../../application/repositories/userRepository';
import LoginUsecase from '../../../application/usecases/login/login';
import HashService from '../../../infra/services/hashService';
import { IHttpRequest } from '../../ports/httpRequest/httpRequest';
import config from '../../../infra/config';

class LoginController {
  async handle(request: IHttpRequest): Promise<HttpResponse> {
    try {
      const { body } = request;

      const userRepository: IUserRepository = new PrismaUserRepository();
      const hashService: IHashService = new HashService();
      const jwtService: IJWTService = new JWTService(config.jwt.secret || '');

      const loginUsecase = new LoginUsecase(
        userRepository,
        hashService,
        jwtService,
      );

      const response = await loginUsecase.run({
        username: body.username,
        email: body.email,
        password: body.password,
      });

      if (response instanceof Error) {
        return new BadRequest(response.message);
      }

      return new Created(response);
    } catch (error) {
      return new ServerError();
    }
  }
}

export default LoginController;

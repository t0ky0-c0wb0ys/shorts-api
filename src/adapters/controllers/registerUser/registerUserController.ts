import Created from '../../ports/httpResponse/created';
import BadRequest from '../../ports/httpResponse/badRequest';
import ServerError from '../../ports/httpResponse/serverError';
import HttpResponse from '../../ports/httpResponse/httpResponse';
import PrismaUserRepository from '../../../infra/repositories/prisma/prismaUserRepository';
import { IHashService } from '../../../application/services/hashService';
import { IUserRepository } from '../../../application/repositories/userRepository';
import RegisterUserUsecase from '../../../application/usecases/registerUser/registerUser';
import HashService from '../../../infra/services/hashService';
import { IHttpRequest } from '../../ports/httpRequest/httpRequest';

class RegisterUserController {
  async handle(request: IHttpRequest): Promise<HttpResponse> {
    try {
      const { body } = request;

      const userRepository: IUserRepository = new PrismaUserRepository();
      const hashService: IHashService = new HashService();

      const registerUserUsecase = new RegisterUserUsecase(
        userRepository,
        hashService,
      );

      const response = await registerUserUsecase.run({
        username: body.username,
        email: body.email,
        password: body.password,
      });

      if (response instanceof Error) {
        return new BadRequest(response.message);
      }

      return new Created(response);
    } catch (error) {
      console.log(error);
      return new ServerError();
    }
  }
}

export default RegisterUserController;

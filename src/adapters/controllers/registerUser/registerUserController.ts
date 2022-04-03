import BadRequest from '../../../infra/rest/httpResponse/badRequest';
import ServerError from '../../../infra/rest/httpResponse/serverError';
import HttpResponse from '../../../infra/rest/httpResponse/httpResponse';
import PrismaUserRepository from '../../../infra/repositories/prisma/prismaUserRepository';
import { IHashService } from '../../../application/services/hashService';
import { IUserRepository } from '../../../application/repositories/userRepository';
import RegisterUserUsecase from '../../../application/usecases/registerUser/registerUser';
import HashService from '../../../infra/services/hashService';

class RegisterUserController {
  async handle(body: any): Promise<HttpResponse> {
    try {
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

      return new HttpResponse(200, response);
    } catch (error) {
      return new ServerError();
    }
  }
}

export default RegisterUserController;

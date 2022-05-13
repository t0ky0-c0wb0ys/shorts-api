import InvalidTokenError from '../../../application/errors/invalidTokenError';
import UnauthorizedError from '../../ports/httpResponse/unauthorized';
import { IJWTService } from '../../../application/services/jwtService';
import JWTService from '../../../infra/services/jwtService';
import BadRequest from '../../ports/httpResponse/badRequest';
import ServerError from '../../ports/httpResponse/serverError';
import HttpResponse from '../../ports/httpResponse/httpResponse';
import AuthenticateUsecase from '../../../application/usecases/authenticate/authenticate';
import { IHttpRequest } from '../../ports/httpRequest/httpRequest';
import config from '../../../infra/config';
import Ok from '../../ports/httpResponse/ok';

class AuthenticateController {
  async handle(request: IHttpRequest): Promise<HttpResponse> {
    try {
      const { headers } = request;

      const jwtService: IJWTService = new JWTService(config.jwt.secret || '');

      const authenticateUsecase = new AuthenticateUsecase(jwtService);

      const bearerToken = headers.authorization;

      if (!bearerToken) {
        return new UnauthorizedError();
      }

      const token = bearerToken?.split('Bearer ')[1];

      const response = await authenticateUsecase.run({
        token,
      });

      if (response instanceof InvalidTokenError) {
        return new UnauthorizedError();
      }

      if (response instanceof Error) {
        return new BadRequest(response.message);
      }

      return new Ok(response);
    } catch (error) {
      return new ServerError();
    }
  }
}

export default AuthenticateController;

import InvalidTokenError from '../../errors/invalidTokenError';
import { IJWTService } from '../../services/jwtService';
import { AuthenticateInput, AuthenticateOutput } from './authenticateDTO';
import RequiredPropertyError from '../../../domain/errors/requiredProperty';

class AuthenticateUsecase {
  private readonly jwtService: IJWTService;

  constructor(jwtService: IJWTService) {
    this.jwtService = jwtService;
  }

  public async run(request: AuthenticateInput): Promise<AuthenticateOutput> {
    const { token } = request;

    if (!token) {
      return new RequiredPropertyError('token');
    }

    const payload = await this.jwtService.verifyToken(token);

    if (!payload) {
      return new InvalidTokenError();
    }

    const authenticateOutput: AuthenticateOutput = payload;

    return authenticateOutput;
  }
}

export default AuthenticateUsecase;

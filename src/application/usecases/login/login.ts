import { IJWTService } from '../../services/jwtService';
import { LoginInput, LoginOutput } from './loginDTO';
import { IUserRepository } from '../../repositories/userRepository';
import { IHashService } from '../../services/hashService';
import IncorrectUsernameEmailOrPasswordError from '../../errors/incorrectUsernameEmailOrPasswordError';
import RequiredPropertyError from '../../../domain/errors/requiredProperty';

class LoginUsecase {
  private readonly userRepository: IUserRepository;

  private readonly hashService: IHashService;

  private readonly jwtService: IJWTService;

  constructor(
    userRepository: IUserRepository,
    hashService: IHashService,
    jwtService: IJWTService,
  ) {
    this.userRepository = userRepository;
    this.hashService = hashService;
    this.jwtService = jwtService;
  }

  public async run(request: LoginInput): Promise<LoginOutput> {
    const { username, email, password } = request;

    if (!email && !username) {
      return new RequiredPropertyError('email or username');
    }

    if (!password) {
      return new RequiredPropertyError('password');
    }

    const user = await this.userRepository.findByEmailOrUsername(
      email,
      username,
    );

    if (!user) {
      return new IncorrectUsernameEmailOrPasswordError();
    }

    const isPasswordValid = await this.hashService.comparePassword(
      password,
      user.password as string,
    );

    if (!isPasswordValid) {
      return new IncorrectUsernameEmailOrPasswordError();
    }

    const TOKEN_EXPIRATION_IN_DAYS = 30;
    const token = await this.jwtService.generateToken(
      { id: user.id },
      TOKEN_EXPIRATION_IN_DAYS,
    );

    const loginOutput: LoginOutput = {
      token,
    };

    return loginOutput;
  }
}

export default LoginUsecase;

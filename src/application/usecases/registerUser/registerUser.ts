import { randomUUID } from 'crypto';
import { UserDTO } from '../dto/user';
import AlreadyExistsError from '../../errors/alreadyExistsError';
import User from '../../../domain/entities/user/user';
import { RegisterUserInput, RegisterUserOutput } from './registerUserDTO';
import { IUserRepository } from '../../repositories/userRepository';
import { IHashService } from '../../services/hashService';

class RegisterUserUsecase {
  private readonly userRepository: IUserRepository;

  private readonly hashService: IHashService;

  constructor(userRepository: IUserRepository, hashService: IHashService) {
    this.userRepository = userRepository;
    this.hashService = hashService;
  }

  public async run(request: RegisterUserInput): Promise<RegisterUserOutput> {
    const { username, email, password } = request;

    const userOrError = User.create(randomUUID(), username, email, password);

    if (userOrError instanceof Error) {
      return userOrError;
    }

    const userAlreadyExists = await this.userRepository.findByEmailOrUsername(
      email,
      username,
    );

    if (userAlreadyExists) {
      return new AlreadyExistsError('User');
    }

    const hashedPassword = await this.hashService.hashPassword(password);

    const user = await this.userRepository.create(
      userOrError.id,
      username,
      email,
      hashedPassword,
      new Date(),
      new Date(),
    );

    const userOutput: UserDTO = {
      id: user.id,
      username: user.username.username,
      email: user.email.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userOutput;
  }
}

export default RegisterUserUsecase;

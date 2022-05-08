import { randomUUID } from 'crypto';
import AlreadyExistsError from '../../errors/alreadyExistsError';
import User from '../../../domain/entities/user/user';
import { RegisterUserRequest } from './registerUserRequest';
import { RegisterUserResponse } from './registerUserResponse';
import { IUserRepository } from '../../repositories/userRepository';
import { IHashService } from '../../services/hashService';

class RegisterUserUsecase {
  private readonly userRepository: IUserRepository;

  private readonly hashService: IHashService;

  constructor(userRepository: IUserRepository, hashService: IHashService) {
    this.userRepository = userRepository;
    this.hashService = hashService;
  }

  public async run(
    request: RegisterUserRequest,
  ): Promise<RegisterUserResponse> {
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

    return user;
  }
}

export default RegisterUserUsecase;

import { randomBytes } from 'crypto';
import { UserDTO } from '../../../../src/application/usecases/dto/user';
import { RegisterUserInput } from '../../../../src/application/usecases/registerUser/registerUserInput';
import { IHashService } from '../../../../src/application/services/hashService';
import { IUserRepository } from '../../../../src/application/repositories/userRepository';
import RegisterUserUsecase from '../../../../src/application/usecases/registerUser/registerUser';
import User from '../../../../src/domain/entities/user/user';
import AlreadyExistsError from '../../../../src/application/errors/alreadyExistsError';
import createUserFactory from '../../../factories/createUserFactory';
import Password from '../../../../src/domain/entities/user/password';

describe('Register User Usecase', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should not register invalid user', async () => {
    const params: RegisterUserInput = {
      email: '',
      username: '',
      password: '',
    };
    const userRepository: IUserRepository = {
      create: jest.fn(),
      findByEmailOrUsername: jest.fn(),
    };
    const hashService: IHashService = {
      hashPassword: jest.fn(),
    };
    jest
      .spyOn(User, 'create')
      .mockImplementation(() => new Error('Invalid user'));

    const registerUser = new RegisterUserUsecase(userRepository, hashService);
    const response = (await registerUser.run(params)) as Error;

    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe('Invalid user');
  });

  it('should not register when user already exists', async () => {
    const user = createUserFactory();
    const password = user.password as Password;
    const params: RegisterUserInput = {
      email: user.email.email,
      username: user.username.username,
      password: password.password,
    };
    const userRepository: IUserRepository = {
      create: jest.fn(),
      findByEmailOrUsername: jest.fn(async () => user),
    };
    const hashService: IHashService = {
      hashPassword: jest.fn(),
    };
    jest.spyOn(User, 'create').mockImplementation(() => user);

    const registerUser = new RegisterUserUsecase(userRepository, hashService);
    const response = (await registerUser.run(params)) as Error;

    expect(response).toBeInstanceOf(AlreadyExistsError);
    expect(response.message).toBe(new AlreadyExistsError('User').message);
  });

  it('should register user', async () => {
    const user = createUserFactory();
    const hashedPassword = await randomBytes(30).toString();
    const password = user.password as Password;
    const params: RegisterUserInput = {
      email: user.email.email,
      username: user.username.username,
      password: password.password,
    };
    const userRepository: IUserRepository = {
      create: jest.fn(async () => user),
      findByEmailOrUsername: jest.fn(),
    };
    const hashService: IHashService = {
      hashPassword: jest.fn(async () => hashedPassword),
    };
    jest.spyOn(User, 'create').mockImplementation(() => user);

    const registerUser = new RegisterUserUsecase(userRepository, hashService);
    const response = await registerUser.run(params);

    const expectedResponse: UserDTO = {
      id: user.id,
      username: user.username.username,
      email: user.email.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    expect(response).toMatchObject(expectedResponse);
    expect(userRepository.findByEmailOrUsername).toHaveBeenCalledWith(
      params.email,
      params.username,
    );
    expect(userRepository.create).toHaveBeenCalledWith(
      user.id,
      params.username,
      params.email,
      hashedPassword,
      expect.anything(),
      expect.anything(),
    );
    expect(hashService.hashPassword).toHaveBeenCalledWith(params.password);
  });
});

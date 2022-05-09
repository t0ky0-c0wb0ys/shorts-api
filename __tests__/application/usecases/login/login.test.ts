import {
  LoginOutputData,
  LoginInput,
} from '../../../../src/application/usecases/login/loginDTO';
import IncorrectUsernameEmailOrPasswordError from '../../../../src/application/errors/incorrectUsernameEmailOrPasswordError';
import RequiredPropertyError from '../../../../src/domain/errors/requiredProperty';
import { IJWTService } from '../../../../src/application/services/jwtService';
import { IHashService } from '../../../../src/application/services/hashService';
import { IUserRepository } from '../../../../src/application/repositories/userRepository';
import LoginUsecase from '../../../../src/application/usecases/login/login';
import createUserFactory from '../../../factories/createUserFactory';
import Password from '../../../../src/domain/entities/user/password';

describe('Login Usecase', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should not login without email or username being provided', async () => {
    const params: LoginInput = {
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
      comparePassword: jest.fn(),
    };
    const jwtService: IJWTService = {
      generateToken: jest.fn(),
    };

    const login = new LoginUsecase(userRepository, hashService, jwtService);
    const response = (await login.run(params)) as Error;

    expect(response).toBeInstanceOf(RequiredPropertyError);
    expect(response.message).toBe('email or username is required');
  });

  it('should not login without password being provided', async () => {
    const user = createUserFactory();
    const params: LoginInput = {
      username: user.username.username,
      password: '',
    };
    const userRepository: IUserRepository = {
      create: jest.fn(),
      findByEmailOrUsername: jest.fn(),
    };
    const hashService: IHashService = {
      hashPassword: jest.fn(),
      comparePassword: jest.fn(),
    };
    const jwtService: IJWTService = {
      generateToken: jest.fn(),
    };

    const login = new LoginUsecase(userRepository, hashService, jwtService);
    const response = (await login.run(params)) as Error;

    expect(response).toBeInstanceOf(RequiredPropertyError);
    expect(response.message).toBe('password is required');
  });

  it('should not login when user is not found', async () => {
    const user = createUserFactory();
    const params: LoginInput = {
      username: user.username.username,
      password: (user.password as Password).password,
    };
    const userRepository: IUserRepository = {
      create: jest.fn(),
      findByEmailOrUsername: jest.fn(async () => null),
    };
    const hashService: IHashService = {
      hashPassword: jest.fn(),
      comparePassword: jest.fn(),
    };
    const jwtService: IJWTService = {
      generateToken: jest.fn(),
    };

    const login = new LoginUsecase(userRepository, hashService, jwtService);
    const response = (await login.run(params)) as Error;

    expect(response).toBeInstanceOf(IncorrectUsernameEmailOrPasswordError);
    expect(response.message).toBe(
      new IncorrectUsernameEmailOrPasswordError().message,
    );
  });

  it('should not login when password is invalid', async () => {
    const user = createUserFactory();
    const params: LoginInput = {
      username: user.username.username,
      password: (user.password as Password).password,
    };
    const userRepository: IUserRepository = {
      create: jest.fn(),
      findByEmailOrUsername: jest.fn(async () => user),
    };
    const hashService: IHashService = {
      hashPassword: jest.fn(),
      comparePassword: jest.fn(async () => false),
    };
    const jwtService: IJWTService = {
      generateToken: jest.fn(),
    };

    const login = new LoginUsecase(userRepository, hashService, jwtService);
    const response = (await login.run(params)) as Error;

    expect(response).toBeInstanceOf(IncorrectUsernameEmailOrPasswordError);
    expect(response.message).toBe(
      new IncorrectUsernameEmailOrPasswordError().message,
    );
  });

  it('should login with valid credentials', async () => {
    const user = createUserFactory();
    const token = '';
    const params: LoginInput = {
      username: user.username.username,
      password: (user.password as Password).password,
    };
    const hashedPassword = 'hashedPass';
    const userRepository: IUserRepository = {
      create: jest.fn(),
      findByEmailOrUsername: jest.fn(async () => ({
        ...user,
        password: hashedPassword,
      })),
    };
    const hashService: IHashService = {
      hashPassword: jest.fn(),
      comparePassword: jest.fn(async () => true),
    };
    const jwtService: IJWTService = {
      generateToken: jest.fn(async () => token),
    };

    const login = new LoginUsecase(userRepository, hashService, jwtService);
    const response = (await login.run(params)) as Error;

    const expectedResponse: LoginOutputData = {
      token,
    };

    expect(response).toMatchObject(expectedResponse);
    expect(userRepository.findByEmailOrUsername).toHaveBeenCalledWith(
      params.email,
      params.username,
    );
    expect(hashService.comparePassword).toHaveBeenCalledWith(
      params.password,
      hashedPassword,
    );
    expect(jwtService.generateToken).toHaveBeenCalledWith({ id: user.id }, 30);
  });
});

import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import InvalidTokenError from '../../../../src/application/errors/invalidTokenError';
import {
  AuthenticateOutputData,
  AuthenticateInput,
} from '../../../../src/application/usecases/authenticate/authenticateDTO';
import RequiredPropertyError from '../../../../src/domain/errors/requiredProperty';
import {
  IJWTService,
  Payload,
} from '../../../../src/application/services/jwtService';
import AuthenticateUsecase from '../../../../src/application/usecases/authenticate/authenticate';

describe('Authenticate Usecase', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should not authenticate when token is not provided', async () => {
    const params: AuthenticateInput = {
      token: '',
    };

    const jwtService: IJWTService = {
      generateToken: jest.fn(),
      verifyToken: jest.fn(),
    };

    const authenticate = new AuthenticateUsecase(jwtService);
    const response = (await authenticate.run(params)) as Error;

    expect(response).toBeInstanceOf(RequiredPropertyError);
    expect(response.message).toBe('token is required');
  });

  it('should not authenticate when token is invalid', async () => {
    const params: AuthenticateInput = {
      token: faker.random.word(),
    };

    const jwtService: IJWTService = {
      generateToken: jest.fn(),
      verifyToken: jest.fn(async () => null),
    };

    const authenticate = new AuthenticateUsecase(jwtService);
    const response = (await authenticate.run(params)) as Error;

    expect(response).toBeInstanceOf(InvalidTokenError);
    expect(response.message).toBe(new InvalidTokenError().message);
  });

  it('should authenticate with valid token', async () => {
    const params: AuthenticateInput = {
      token: faker.random.word(),
    };
    const payload: Payload = {
      id: randomUUID(),
    };
    const jwtService: IJWTService = {
      generateToken: jest.fn(),
      verifyToken: jest.fn(async () => payload),
    };

    const authenticate = new AuthenticateUsecase(jwtService);
    const response = (await authenticate.run(params)) as Error;

    const expectedResponse: AuthenticateOutputData = payload;

    expect(response).toMatchObject(expectedResponse);
    expect(jwtService.verifyToken).toHaveBeenCalledWith(params.token);
  });
});

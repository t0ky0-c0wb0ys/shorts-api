import { randomUUID } from 'crypto';
import faker from '@faker-js/faker';
import Email from '../../../../src/domain/valueObjects/email/email';
import User from '../../../../src/domain/entities/user/user';
import Username from '../../../../src/domain/entities/user/username';
import Password from '../../../../src/domain/entities/user/password';

describe('User entity', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should not create a user with an invalid email', () => {
    const params = {
      id: randomUUID(),
      username: faker.internet.userName(),
      email: 'invalidEmail',
    };
    jest.spyOn(Email, 'create').mockReturnValue(new Error('Email error'));
    jest.spyOn(Username, 'create').mockReturnValue(new Error('Username error'));

    const error = User.create(
      params.id,
      params.username,
      params.email,
    ) as Error;

    expect(error.message).toBe('Email error');
  });

  it('should not create a user with an invalid username', () => {
    const params = {
      id: randomUUID(),
      username: `${faker.internet.userName()}  `,
      email: faker.internet.email(),
    };
    jest.spyOn(Email, 'create').mockReturnValue(Email.create(params.email));
    jest.spyOn(Username, 'create').mockReturnValue(new Error('Username error'));

    const error = User.create(
      params.id,
      params.username,
      params.email,
    ) as Error;

    expect(error.message).toBe('Username error');
  });

  it('should not create a user with an invalid password', () => {
    const params = {
      id: randomUUID(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(3),
    };
    jest.spyOn(Email, 'create').mockReturnValue(Email.create(params.email));
    jest
      .spyOn(Username, 'create')
      .mockReturnValue(Username.create(params.username));
    jest.spyOn(Password, 'create').mockReturnValue(new Error('Password error'));

    const error = User.create(
      params.id,
      params.username,
      params.email,
      params.password,
    ) as Error;

    expect(error.message).toBe('Password error');
  });

  it('should create a user with a valid password', () => {
    const params = {
      id: randomUUID(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(8),
    };
    jest.spyOn(Email, 'create').mockReturnValue(Email.create(params.email));
    jest
      .spyOn(Username, 'create')
      .mockReturnValue(Username.create(params.username));
    jest
      .spyOn(Password, 'create')
      .mockReturnValue(Password.create(params.password));

    const user = User.create(
      params.id,
      params.username,
      params.email,
      params.password,
    ) as User;

    expect(user).toBeInstanceOf(User);
    expect(user.username.username).toBe(params.username);
    expect(user.email.email).toBe(params.email);
    expect(user?.password?.password).toBe(params.password);
  });
});

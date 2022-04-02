import faker from '@faker-js/faker';
import MinLengthPasswordError from '../../../../src/domain/errors/MinLengthPasswordError';
import User from '../../../../src/domain/entities/user/user';

describe('User entity', () => {
  it('should not create a user with an invalid email', () => {
    const params = {
      username: faker.internet.userName(),
      email: 'invalidEmail',
    };

    const error = User.create(params.username, params.email) as Error;

    expect(error.message).toBe('Invalid email');
  });

  it('should not create a user with an invalid username', () => {
    const params = {
      username: `${faker.internet.userName()}  `,
      email: faker.internet.email(),
    };

    const error = User.create(params.username, params.email) as Error;

    expect(error.message).toBe('Invalid username');
  });

  it('should not create a user with an invalid password', () => {
    const params = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(3),
    };

    const error = User.create(
      params.username,
      params.email,
      params.password,
    ) as Error;

    expect(error.message).toBe(new MinLengthPasswordError().message);
  });

  it('should create a user with a valid password', () => {
    const params = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(8),
    };

    const user = User.create(
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

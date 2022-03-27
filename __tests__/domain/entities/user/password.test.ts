import faker from '@faker-js/faker';
import Password from '../../../../src/domain/entities/user/password';

describe('User entity', () => {
  it('should not create a password with too few chars', () => {
    const params = {
      password: faker.internet.password(3),
    };

    const error = Password.create(params.password) as Error;

    expect(error.message).toBe('Invalid password');
  });

  it('should create a password', () => {
    const params = {
      password: faker.internet.password(8),
    };

    const password = Password.create(params.password) as Password;

    expect(password).toBeInstanceOf(Password);
    expect(password.password).toBe(params.password);
  });
});

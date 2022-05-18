import faker from '@faker-js/faker';
import RequiredPropertyError from '../../../../src/domain/errors/requiredProperty';
import Password from '../../../../src/domain/entities/user/password';
import MinLengthPasswordError from '../../../../src/domain/errors/minLengthPasswordError';

describe('User entity', () => {
  it('should not create a password when value is not provided', () => {
    const params = {
      password: '',
    };

    const error = Password.create(params.password) as Error;

    expect(error).toBeInstanceOf(RequiredPropertyError);
    expect(error.message).toBe(new RequiredPropertyError('password').message);
  });

  it('should not create a password with too few chars', () => {
    const params = {
      password: faker.internet.password(3),
    };

    const error = Password.create(params.password) as Error;

    expect(error).toBeInstanceOf(MinLengthPasswordError);
    expect(error.message).toBe(new MinLengthPasswordError().message);
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

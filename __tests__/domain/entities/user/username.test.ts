import faker from '@faker-js/faker';
import RequiredPropertyError from '../../../../src/domain/errors/requiredProperty';
import UsernameCantContainWhitespaceError from '../../../../src/domain/errors/usernameCantContainWhitespaceError';
import Username from '../../../../src/domain/entities/user/username';

describe('Username entity', () => {
  it('should not create a username when value is not provided', () => {
    const params = {
      username: '',
    };

    const error = Username.create(params.username) as Error;

    expect(error).toBeInstanceOf(RequiredPropertyError);
    expect(error.message).toBe(new RequiredPropertyError('username').message);
  });

  it('should not create a username with whitespaces', () => {
    const params = {
      username: `${faker.internet.userName()}  `,
    };

    const error = Username.create(params.username) as Error;

    expect(error).toBeInstanceOf(UsernameCantContainWhitespaceError);
    expect(error.message).toBe(
      new UsernameCantContainWhitespaceError().message,
    );
  });

  it('should create a username', () => {
    const params = {
      username: faker.internet.userName(),
    };

    const username = Username.create(params.username) as Username;

    expect(username).toBeInstanceOf(Username);
    expect(username.username).toBe(params.username);
  });
});

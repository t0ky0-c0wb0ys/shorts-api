import faker from '@faker-js/faker';
import UsernameCantContainWhitespaceError from '../../../../src/domain/errors/UsernameCantContainWhitespaceError';
import Username from '../../../../src/domain/entities/user/username';

describe('Username entity', () => {
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

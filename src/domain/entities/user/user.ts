import MaxLengthEmailError from '../../errors/maxLengthEmailError';
import InvalidEmailError from '../../errors/invalidEmailError';
import UsernameCantContainWhitespaceError from '../../errors/usernameCantContainWhitespaceError';
import MinLengthPasswordError from '../../errors/minLengthPasswordError';
import Email from '../../valueObjects/email/email';
import Password from './password';
import Username from './username';
import RequiredPropertyError from '../../errors/requiredProperty';

class User {
  public readonly id: string;

  public readonly username: Username;

  public readonly email: Email;

  public readonly password: Password | string;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  public constructor(
    id: string,
    username: Username,
    email: Email,
    password: Password | string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(
    id: string,
    username: string,
    email: string,
    password: string,
  ):
    | User
    | RequiredPropertyError
    | MinLengthPasswordError
    | UsernameCantContainWhitespaceError
    | InvalidEmailError
    | MaxLengthEmailError {
    const emailOrError = Email.create(email);
    const usernameOrError = Username.create(username);
    const passwordOrError = Password.create(password);

    if (emailOrError instanceof Error) {
      return emailOrError;
    }

    if (usernameOrError instanceof Error) {
      return usernameOrError;
    }

    if (passwordOrError instanceof Error) {
      return passwordOrError;
    }

    return new User(
      id,
      usernameOrError,
      emailOrError,
      passwordOrError,
      new Date(),
      new Date(),
    );
  }
}

export default User;

import InvalidAttributeError from '../../errors/invalidAttributeError';
import Email from '../../valueObjects/email/email';
import Password from './password';
import Username from './username';

class User {
  public readonly id: string | null;

  public readonly username: Username;

  public readonly email: Email;

  public readonly password: Password | null;

  public readonly hashedPassword: string | null;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  private constructor(
    username: Username,
    email: Email,
    password?: Password | null,
    hashedPassword?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id || null;
    this.username = username;
    this.email = email;
    this.password = password || null;
    this.hashedPassword = hashedPassword || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  static create(
    username: string,
    email: string,
    password?: string,
    hashedPassword?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): User | InvalidAttributeError {
    const emailOrError = Email.create(email);
    const usernameOrError = Username.create(username);

    if (emailOrError instanceof Error) {
      return emailOrError;
    }

    if (usernameOrError instanceof Error) {
      return usernameOrError;
    }

    let passwordObject: Password | null = null;

    if (password) {
      const passwordOrError = Password.create(password);

      if (passwordOrError instanceof Error) {
        return passwordOrError;
      }

      passwordObject = passwordOrError;
    }

    return new User(
      usernameOrError,
      emailOrError,
      passwordObject,
      hashedPassword,
      id,
      createdAt,
      updatedAt,
    );
  }
}

export default User;

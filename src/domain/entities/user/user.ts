import BaseError from '../../errors/baseError';
import Email from '../../valueObjects/email/email';
import Password from './password';
import UserData from './userData';
import Username from './username';

class User {
  public readonly id: string | null;

  public readonly username: Username;

  public readonly email: Email;

  public readonly password: Password | null;

  public readonly passwordHashed: string | null;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  private constructor(
    username: Username,
    email: Email,
    password?: Password | null,
    passwordHashed?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id || null;
    this.username = username;
    this.email = email;
    this.password = password || null;
    this.passwordHashed = passwordHashed || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  static create(userData: UserData): User | BaseError {
    const emailOrError = Email.create(userData.email);
    const usernameOrError = Username.create(userData.username);

    if (emailOrError instanceof BaseError) {
      return emailOrError;
    }

    if (usernameOrError instanceof BaseError) {
      return usernameOrError;
    }

    let password: Password | null = null;

    if (userData.password) {
      const passwordOrError = Password.create(userData.password);

      if (passwordOrError instanceof BaseError) {
        return passwordOrError;
      }

      password = passwordOrError;
    }

    return new User(
      usernameOrError,
      emailOrError,
      password,
      userData.passwordHashed,
      userData.id,
      userData.createdAt,
      userData.updatedAt,
    );
  }
}

export default User;

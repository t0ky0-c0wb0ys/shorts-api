import MinLengthPasswordError from '../../errors/minLengthPasswordError';

class Password {
  public readonly password: string;

  public constructor(password: string) {
    this.password = password;
  }

  static isValid(password: string): boolean | MinLengthPasswordError {
    const MIN_PASSWORD_LENGTH = 8;

    if (password.length < MIN_PASSWORD_LENGTH) {
      return new MinLengthPasswordError();
    }

    return true;
  }

  static create(password: string): MinLengthPasswordError | Password {
    const validOrError = this.isValid(password);

    if (validOrError instanceof Error) {
      return validOrError;
    }

    return new Password(password);
  }
}

export default Password;

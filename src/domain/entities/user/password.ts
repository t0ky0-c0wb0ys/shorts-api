import InvalidAttributeError from '../../errors/invalidAttributeError';

class Password {
  public readonly password: string;

  private constructor(password: string) {
    this.password = password;
  }

  static isValid(password: string): boolean {
    const MIN_PASSWORD_LENGTH = 8;

    if (password.length < MIN_PASSWORD_LENGTH) {
      return false;
    }

    return true;
  }

  static create(password: string): InvalidAttributeError | Password {
    if (!this.isValid(password)) {
      return new InvalidAttributeError('password');
    }

    return new Password(password);
  }
}

export default Password;

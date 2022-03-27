import InvalidAttributeError from '../../errors/invalidAttributeError';

class Username {
  public readonly username: string;

  private constructor(username: string) {
    this.username = username;
  }

  static isValid(username: string): boolean {
    if (this.includesWhitespace(username)) {
      return false;
    }

    return true;
  }

  static includesWhitespace(username: string): boolean {
    return username.includes(' ');
  }

  static create(username: string): InvalidAttributeError | Username {
    if (!this.isValid(username)) {
      return new InvalidAttributeError('username');
    }

    return new Username(username);
  }
}

export default Username;

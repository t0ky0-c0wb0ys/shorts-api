import UsernameCantContainWhitespaceError from '../../errors/UsernameCantContainWhitespaceError';

class Username {
  public readonly username: string;

  private constructor(username: string) {
    this.username = username;
  }

  static isValid(
    username: string,
  ): boolean | UsernameCantContainWhitespaceError {
    if (this.includesWhitespace(username)) {
      return new UsernameCantContainWhitespaceError();
    }

    return true;
  }

  static includesWhitespace(username: string): boolean {
    return username.includes(' ');
  }

  static create(
    username: string,
  ): UsernameCantContainWhitespaceError | Username {
    const validOrError = this.isValid(username);

    if (validOrError instanceof Error) {
      return validOrError;
    }

    return new Username(username);
  }
}

export default Username;

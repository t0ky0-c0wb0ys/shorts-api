import MaxLengthEmailError from '../../errors/maxLengthEmailError';
import InvalidEmailError from '../../errors/invalidEmailError';

class Email {
  public readonly email: string;

  private constructor(email: string) {
    this.email = email;
  }

  static isValid(
    email: string,
  ): MaxLengthEmailError | InvalidEmailError | boolean {
    const MAX_EMAIL_LENGTH = 255;

    if (!email || email.trim().length > MAX_EMAIL_LENGTH) {
      return new MaxLengthEmailError();
    }

    const VALID_EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!VALID_EMAIL_REGEX.test(email)) {
      return new InvalidEmailError();
    }

    return true;
  }

  static create(
    email: string,
  ): MaxLengthEmailError | InvalidEmailError | Email {
    const validOrError = this.isValid(email);

    if (validOrError instanceof Error) {
      return validOrError;
    }

    return new Email(email);
  }
}

export default Email;

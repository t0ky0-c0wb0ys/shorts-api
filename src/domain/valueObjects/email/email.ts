import InvalidAttributeError from '../../errors/invalidAttributeError';

class Email {
  public readonly email: string;

  private constructor(email: string) {
    this.email = email;
  }

  static isValid(email: string): boolean {
    const MAX_EMAIL_LENGTH = 255;

    if (!email || email.trim().length > MAX_EMAIL_LENGTH) {
      return false;
    }

    const VALID_EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!VALID_EMAIL_REGEX.test(email)) {
      return false;
    }

    return true;
  }

  static create(email: string): InvalidAttributeError | Email {
    if (!this.isValid(email)) {
      return new InvalidAttributeError('email');
    }

    return new Email(email);
  }
}

export default Email;

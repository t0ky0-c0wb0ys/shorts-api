class BaseError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export default BaseError;

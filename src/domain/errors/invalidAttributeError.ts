import BaseError from './baseError';

class InvalidAttributeError extends BaseError {
  constructor(attribute: string) {
    super(`Invalid ${attribute}`);
  }
}

export default InvalidAttributeError;

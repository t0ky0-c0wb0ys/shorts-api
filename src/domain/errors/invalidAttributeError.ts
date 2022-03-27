class InvalidAttributeError extends Error {
  constructor(attribute: string) {
    super(`Invalid ${attribute}`);
  }
}

export default InvalidAttributeError;

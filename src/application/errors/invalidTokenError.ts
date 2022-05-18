class InvalidTokenError extends Error {
  constructor() {
    super('Invalid token');
  }
}

export default InvalidTokenError;

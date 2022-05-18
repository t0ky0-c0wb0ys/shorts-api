class InvalidEmailError extends Error {
  constructor() {
    super('Invalid email');
  }
}

export default InvalidEmailError;

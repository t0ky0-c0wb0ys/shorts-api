class MinLengthPasswordError extends Error {
  constructor() {
    super('Password should contain at least 8 characters');
  }
}

export default MinLengthPasswordError;

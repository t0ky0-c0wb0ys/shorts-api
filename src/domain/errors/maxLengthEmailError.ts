class MaxLengthEmailError extends Error {
  constructor() {
    super('Email max length is 255');
  }
}

export default MaxLengthEmailError;

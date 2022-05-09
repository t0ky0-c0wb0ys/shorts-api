class IncorrectUsernameEmailOrPasswordError extends Error {
  constructor() {
    super('Incorrect username/email or password');
  }
}

export default IncorrectUsernameEmailOrPasswordError;

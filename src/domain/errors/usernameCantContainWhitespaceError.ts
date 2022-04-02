class UsernameCantContainWhitespaceError extends Error {
  constructor() {
    super('Username cannot contain whitespace');
  }
}

export default UsernameCantContainWhitespaceError;

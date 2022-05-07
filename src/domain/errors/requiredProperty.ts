class RequiredPropertyError extends Error {
  constructor(property: string) {
    super(`${property} is required`);
  }
}

export default RequiredPropertyError;

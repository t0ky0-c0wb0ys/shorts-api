class AlreadyExistsError extends Error {
  constructor(entity: string) {
    super(`${entity} already exists`);
  }
}

export default AlreadyExistsError;

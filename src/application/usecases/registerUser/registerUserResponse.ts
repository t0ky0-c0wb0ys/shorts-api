import AlreadyExistsError from '../../errors/alreadyExistsError';
import InvalidAttributeError from '../../../domain/errors/invalidAttributeError';
import User from '../../../domain/entities/user/user';

export type RegisterUserResponse =
  | User
  | AlreadyExistsError
  | InvalidAttributeError;

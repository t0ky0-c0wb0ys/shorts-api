import AlreadyExistsError from '../../errors/alreadyExistsError';
import UsernameCantContainWhitespaceError from '../../../domain/errors/usernameCantContainWhitespaceError';
import MinLengthPasswordError from '../../../domain/errors/minLengthPasswordError';
import InvalidEmailError from '../../../domain/errors/invalidEmailError';
import MaxLengthEmailError from '../../../domain/errors/maxLengthEmailError';
import User from '../../../domain/entities/user/user';

export type RegisterUserResponse =
  | User
  | AlreadyExistsError
  | UsernameCantContainWhitespaceError
  | MinLengthPasswordError
  | InvalidEmailError
  | MaxLengthEmailError;

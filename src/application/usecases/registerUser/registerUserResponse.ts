import { UserDTO } from '../dto/user';
import AlreadyExistsError from '../../errors/alreadyExistsError';
import UsernameCantContainWhitespaceError from '../../../domain/errors/usernameCantContainWhitespaceError';
import MinLengthPasswordError from '../../../domain/errors/minLengthPasswordError';
import InvalidEmailError from '../../../domain/errors/invalidEmailError';
import MaxLengthEmailError from '../../../domain/errors/maxLengthEmailError';

export type RegisterUserResponse =
  | UserDTO
  | AlreadyExistsError
  | UsernameCantContainWhitespaceError
  | MinLengthPasswordError
  | InvalidEmailError
  | MaxLengthEmailError;

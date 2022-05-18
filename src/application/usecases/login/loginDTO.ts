import IncorrectUsernameEmailOrPasswordError from '../../errors/incorrectUsernameEmailOrPasswordError';
import RequiredPropertyError from '../../../domain/errors/requiredProperty';

export type LoginInput = {
  username?: string;
  email?: string;
  password: string;
};

export type LoginOutputData = {
  token: string;
};

export type LoginOutput =
  | LoginOutputData
  | IncorrectUsernameEmailOrPasswordError
  | RequiredPropertyError;

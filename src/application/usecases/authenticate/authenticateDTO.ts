import InvalidTokenError from '../../errors/invalidTokenError';
import RequiredPropertyError from '../../../domain/errors/requiredProperty';
import { Payload } from '../../services/jwtService';

export type AuthenticateInput = {
  token: string;
};

export type AuthenticateOutputData = Payload;

export type AuthenticateOutput =
  | AuthenticateOutputData
  | InvalidTokenError
  | RequiredPropertyError;

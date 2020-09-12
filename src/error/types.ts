import { errorTypes } from './index';

export type ErrorType = { statusCode: number; message: string; type: errorTypes }
type ErrorTypes = ErrorType[]

export const types = [
  { type: 'Server.internal', statusCode: 500, message: 'internal server error' },
  { type: 'Authentication.rejected', statusCode: 403, message: 'invalid authentication params' },
  { type: 'Validation.rejected', statusCode: 400, message: 'invalid data provided' },
  { type: 'Default', statusCode: 500, message: 'internal server error' },
] as ErrorTypes;

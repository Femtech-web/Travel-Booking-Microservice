import { IErrorObject } from '../interfaces';

/**
 * A method that returns a correct error object based on the error code provided as a parameter
 *
 */
export function validateServerError(): IErrorObject {
  return {
    code: 500,
    message: 'Internal Server Error',
  };
}

import { EXCEPTION_ERROR_CODES } from 'src/enums/exceptionErrorCodes';

export const NotFoundValidationStack = {
  isEmail: EXCEPTION_ERROR_CODES.EMAIL_INVALID,
  UserExists: EXCEPTION_ERROR_CODES.USER_DOES_NOT_EXIST,
};

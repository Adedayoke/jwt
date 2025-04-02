import { AppError } from "./app-error-class";
import { HttpStatusCodeType } from "./status-enum-class";
import { ErrorTypeSignature } from "./error.types";

export class BadRequestError extends AppError {
  constructor(
    message: string,
    errorCode: HttpStatusCodeType,
    errorType: ErrorTypeSignature
  ) {
    super(message, errorCode, errorType);
  }
}


export class InternalServerError extends AppError {
  constructor(
    message: string,
    errorCode: HttpStatusCodeType,
    errorType: ErrorTypeSignature
  ) {
    super(message, errorCode, errorType);
  }
}
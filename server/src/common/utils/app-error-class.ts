import { ErrorTypeSignature } from "./error.types";
import { HttpStatusCodeType } from "./status-enum-class";

export class AppError extends Error {
  public errorCode: HttpStatusCodeType;
  public errorType: ErrorTypeSignature;

  constructor(
    message: string,
    errorCode: HttpStatusCodeType,
    errorType: ErrorTypeSignature
  ) {
    super(message);
    this.errorCode = errorCode;
    this.errorType = errorType;
  }
}
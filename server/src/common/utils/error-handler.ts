import { ErrorRequestHandler, Request, Response } from "express";
import { BadRequestError, InternalServerError } from "./other-error-class";

export const ErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response
): any => {
  if (error instanceof BadRequestError) {
    return res.status(error.errorCode).json({
      message: error.message,
      errorType: error.errorType,
    });
  }

  if (error instanceof InternalServerError) {
    return res.status(error.errorCode).json({
      message: error.message,
      errorType: error.errorType,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
  
};

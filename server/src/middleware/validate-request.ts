import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";
import { ErrorTypeSignature } from "../common/utils/error.types";
import { HTTPStatusCode } from "../common/utils/status-enum-class";

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error: any) {
      const formatted_error = error.errors;
      console.log(formatted_error);

      res.status(HTTPStatusCode.BAD_REQUEST).json({
        success: false,
        message: "input validation error",
        data: formatted_error,
      });
    }
  };

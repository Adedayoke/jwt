import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/env-config";

type protectedType = (req: Request, res: Response, next: NextFunction) => any;

export const protectedRoute =
  (): protectedType => (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    console.log(token);

    try {
      if (token) {
        const isValid = jwt.verify(token, appConfig().JWT_SECRET);

        if (isValid) {
          (req as any).user = isValid;

          next();
        } else {
          throw new Error("Invalid token");
        }
      }
    } catch (error) {
      next(error);
    }
  };

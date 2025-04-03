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

          console.log("token valid");

          next();

          return;
        } else {
          throw new Error("Invalid token");
        }
      }

      return res.status(404).json({
        success: false,
        message: "No token found",
      });
    } catch (error) {
      next(error);
    }
    };
  







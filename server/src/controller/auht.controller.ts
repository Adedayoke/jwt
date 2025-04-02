import { Request, Response, NextFunction } from "express";
import { signUpType } from "../common/schema/auth.schema";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../common/utils/jwt";
import { HTTPStatusCode } from "../common/utils/status-enum-class";

export const signUp = (
  req: Request<{}, {}, signUpType>,
  res: Response,
  next: NextFunction
) => {
  // take the inputs

  const { firstName, lastName, email, password } = req.body;

  res.status(HTTPStatusCode.CREATED).json({
    success: true,
    token: {
      access: generateToken("ACCESS", { userId: 4 }),
      refresh: generateToken("REFRESH", { userId: 4 }),
    },
  });
};

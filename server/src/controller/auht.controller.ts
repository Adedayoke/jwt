import { Request, Response, NextFunction } from "express";
import { signUpType } from "../common/schema/auth.schema";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../common/utils/jwt";
import { HTTPStatusCode } from "../common/utils/status-enum-class";

export const signUp = async (
  req: Request<{}, {}, signUpType>,
  res: Response,
  next: NextFunction
) => {
  // take the inputs

  const { firstName, lastName, email, password } = req.body;

  const prisma = new PrismaClient();

  const newUser = await prisma.users.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      role: "user",
    },
  });

  if (newUser) {
    return res.status(HTTPStatusCode.CREATED).json({
      success: true,
      token: {
        access: generateToken("ACCESS", { userId: 4 }),
        refresh: generateToken("REFRESH", { userId: 4 }),
      },
      data: newUser,
    });
  }

  res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Failed to create user",
  });
};

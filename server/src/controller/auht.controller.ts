import { Request, Response, NextFunction } from "express";
import { signinType, signUpType } from "../common/schema/auth.schema";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../common/utils/jwt";
import { HTTPStatusCode } from "../common/utils/status-enum-class";
import bcrypt from "bcrypt";

export const signUp = async (
  req: Request<{}, {}, signUpType>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  // take the inputs
  const { firstName, lastName, email, password } = req.body;

  const prisma = new PrismaClient();

  // check if user with the email exists .

  const userExists = await prisma.users.findUnique({
    where: { email },
  });

  if (userExists) {
    return res.status(401).json({
      success: true,
      message: "Email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.users.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
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

export const signIn = async (
  req: Request<{}, {}, signinType>,
  res: Response,
  next: NextFunction
) => {
  // take the inputs

  const { email, password } = req.body;

  // find a user with the specified user

  const prisma = new PrismaClient();

  // find the user with the attached email

  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    // proceed to validate the password

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return res.status(200).json({
        sucess: true,
        token: {
          accessToken: generateToken("ACCESS", { userId: user.id }),
          refreshToken: generateToken("REFRESH", { userId: user.id }),
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "invalid credentials",
    });
  }

  res.status(500).json({
    success: true,
    message: "Failed to authenticate user",
  });
};

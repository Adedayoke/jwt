import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // create the prismaClient
  const prisma = new PrismaClient();

  // get all the posts

  try {
    const allUsers = await prisma.posts.findMany({});

    res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    next(error);
  }
};
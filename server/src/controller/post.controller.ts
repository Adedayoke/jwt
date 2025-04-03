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

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prisma = new PrismaClient();

  // get the posts Id
  const { id } = req.params;

  // find the post with the associated Id

  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (post) {
      return res.status(200).json({
        success: true,
        data: post,
      });
    }

    res.status(404).json({
      success: false,
      message: "Post not found",
    });
      
  } catch (error) {
    next(error);
    }
    

};
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

// GET ==> REQUESTS

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
): Promise<any> => {
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

export const getAllPostsMadeByAuser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const prisma = new PrismaClient();

  // get the id of the user from the protected route

  const userId = (req as any)?.user?.userId;

  try {
    const posts = await prisma.posts.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });

    if (posts) {
      //   adding pagination , should in case the posts made by a single user is more thant the required posts per page .

      const totalPosts = posts.length;

      const page = parseInt(req.query.page as string) || 1;
      const postsPerPage = 10; // you can change this value according to your requirement
      const totalPages = Math.ceil(totalPosts / postsPerPage);
      const startIndex = (page - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const paginatedPosts = posts.slice(startIndex, endIndex);

      return res.status(200).json({
        success: true,
        data: paginatedPosts,
        totalPages,
      });
    }

    throw new Error("cant fetch posts");
  } catch (error) {
    next(error);
  }
};

// POST ==> REQUESTS

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const prisma = new PrismaClient();

  const { text } = req.body;

  // get the id of the user from the protected route
  const userId = (req as any)?.user?.userId;

  try {
    // attempt to create a post for a user
    const post = await prisma.posts.create({
      data: {
        userId: userId,
        text: text,
      },
    });

    // assert if there was a post

    if (post) {
      return res.status(201).json({
        success: true,
        data: post,
      });
    }

    throw new Error("Could not create post");
  } catch (error) {
    next(error);
  }
};

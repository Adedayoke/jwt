import { Request, Response, NextFunction } from "express";

type asyncType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler = 
  (func: asyncType): asyncType => 
  async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
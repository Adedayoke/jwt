import express from "express";
import {
  getAllPosts,
  getPostById,
  getAllPostsMadeByAuser,
} from "../controller/post.controller";
import { protectedRoute } from "../middleware/protectedroute";
import { validateRequest } from "../middleware/validate-request";
import { postQuerySchema } from "../common/schema/post-schema";

const postRoute = express.Router();

postRoute.get("/", protectedRoute(), getAllPosts);
postRoute.get("/single-post/:id", protectedRoute(), getPostById);
postRoute.get(
  "/all-post-by-user/?page=value",
  protectedRoute(),
  validateRequest(postQuerySchema),
  getAllPostsMadeByAuser
);

export default postRoute;

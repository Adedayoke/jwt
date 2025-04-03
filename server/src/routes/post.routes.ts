import express from "express";
import { getAllPosts, getPostById } from "../controller/post.controller";
import { protectedRoute } from "../middleware/protectedroute";

const postRoute = express.Router();

postRoute.get("/", protectedRoute(), getAllPosts);
postRoute.get("/:id", protectedRoute(), getPostById);

export default postRoute;

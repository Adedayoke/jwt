import express from "express";
import { getAllPosts } from "../controller/post.controller";
import { protectedRoute } from "../middleware/protectedroute";

const postRoute = express.Router();

postRoute.get("/", protectedRoute(), getAllPosts);

export default postRoute;

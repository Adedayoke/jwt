import express from "express";
import { signIn, signUp } from "../controller/auht.controller";
import { validateRequest } from "../middleware/validate-request";
import { signUpSchema, signInSchema } from "../common/schema/auth.schema";

const authRouter = express.Router();

authRouter.post("/signup", validateRequest(signUpSchema), signUp);
authRouter.post("/signin", validateRequest(signInSchema), signIn);




export default authRouter;
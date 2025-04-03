import express from "express";
import { signUp } from "../controller/auht.controller";
import { validateRequest } from "../middleware/validate-request";
import { signUpSchema } from "../common/schema/auth.schema";

const authRouter = express.Router();

authRouter.post("/signup", validateRequest(signUpSchema), signUp);


export default authRouter;
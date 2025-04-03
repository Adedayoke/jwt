import express from "express";
import { ErrorHandler } from "./common/utils/error-handler";
import authRouter from "./routes/auht.routes";
import dotenv from "dotenv";
import postRoute from "./routes/post.routes";


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRoute);
app.use(ErrorHandler);



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

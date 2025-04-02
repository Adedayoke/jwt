import express from "express";
import { ErrorHandler } from "./common/utils/error-handler";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
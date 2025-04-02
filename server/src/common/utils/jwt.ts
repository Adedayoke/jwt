import jwt from "jsonwebtoken";
import dotend, { config } from "dotenv";
import { appConfig } from "../../config/env-config";
type TPayload = {
  userId: number;
};

type TokenType = "ACCESS" | "REFRESH";

export const generateToken = (tokenType: TokenType, payload: TPayload) => {
  if (tokenType === "ACCESS") {
    return jwt.sign(payload, appConfig().JWT_SECRET, {
      expiresIn: +appConfig().ACCESS_EXPIRY_TIME,
    });
  }

  return jwt.sign(payload, appConfig().REFRESH_TOKEN_TIME, {
    expiresIn: +appConfig().REFRESH_TOKEN_TIME,
  });
};

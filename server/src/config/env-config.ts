import dotenv from "dotenv";
dotenv.config();

export const appConfig = () => ({
  PORT: parseInt(getEnv("PORT") || "3000", 10),
  JWT_SECRET: getEnv("JWT_SECRET"),
  ACCESS_EXPIRY_TIME: getEnv("ACCESS_EXPIRY_TIME"),
  REFRESH_TOKEN_TIME: getEnv("REFRESH_TOKEN_TIME"),
});

const getEnv = (key: string, defaultValue: string = "") => {
  const keyValue = process.env[key];

  if (keyValue === undefined) {
    return defaultValue;
  }

  return keyValue;
};
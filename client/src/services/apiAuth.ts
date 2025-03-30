import { axiosNoToken } from "./axios";
import { LoginType, SignupType } from "./types";

export async function login({ email, password }: LoginType) {
  try {
    const response = await axiosNoToken.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function signup({
  email,
  password,
  firstname,
  lastname,
  username,
}: SignupType) {
  try {
    const response = await axiosNoToken.post("/auth/signup", {
      email,
      password,
      firstname,
      lastname,
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error Creating account:", error);
    throw error;
  }
}

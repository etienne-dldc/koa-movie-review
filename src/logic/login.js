import { findUserByUsername } from "../database/index.js";
import bcrypt from "bcrypt";
import { HttpError } from "./HttpError.js";

export async function login(username, password) {
  const user = await findUserByUsername(username);
  let isValid = false;
  if (user) {
    isValid = await bcrypt.compare(password, user.password);
  }
  if (!isValid) {
    throw new HttpError(403);
  }
  return user;
}

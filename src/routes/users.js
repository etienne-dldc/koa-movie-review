import * as z from "zod";
import Router from "@koa/router";
import { signup } from "../logic/signup.js";
import { login } from "../logic/login.js";
import { zodBodyValidator } from "../middlewares/zodBodyValidator.js";
import { authenticated } from "../middlewares/authenticated.js";

export const usersRouter = Router();

usersRouter.post(
  "/signup",
  zodBodyValidator(
    z.object({
      username: z.string().nonempty(),
      password: z.string().min(4),
      name: z.string().nonempty(),
    })
  ),
  async (ctx) => {
    const { username, password, name } = ctx.request.body;
    ctx.body = await signup(username, password, name);
  }
);

usersRouter.post(
  "/login",
  zodBodyValidator(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  ),
  async (ctx) => {
    const { username, password } = ctx.request.body;
    ctx.body = await login(username, password);
  }
);

usersRouter.get("/me", authenticated, async (ctx) => {
  ctx.body = ctx.user;
});

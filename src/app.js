import helmet from "koa-helmet";
import Koa from "koa";
import errorHandler from "koa-error";
import bodyparser from "koa-bodyparser";
import cors from "@koa/cors";
import { setupDatabase } from "./database/setup.js";
import { router } from "./routes/index.js";
import { knex } from "./database/connection.js";

export { knex };

export async function main() {
  // setup database before starting the app !
  await setupDatabase();

  const app = new Koa();

  app.use(cors());
  app.use(errorHandler({ accepts: ["json"] }));
  app.use(helmet());
  app.use(bodyparser({ enableTypes: ["json"] }));

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

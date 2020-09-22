import Knex from "knex";
import { envs } from "../envs.js";
import * as path from "node:path";

export const SQLITE_FILE_PATH = path.resolve(process.cwd(), envs.SQLITE_FILE_PATH);

export const knex = Knex({
  client: "better-sqlite3",
  connection: {
    filename: SQLITE_FILE_PATH,
  },
  useNullAsDefault: true,
});

import * as z from "zod";

const schema = z.object({
  SQLITE_FILE_PATH: z.string(),
});

export const envs = schema.parse({
  SQLITE_FILE_PATH: process.env.SQLITE_FILE_PATH,
});

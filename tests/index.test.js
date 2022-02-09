import supertest from "supertest";
import * as path from "path";
import fse from "fs-extra";

const TEST_SQLITE_FILE_PATH = path.resolve("tests/data/db.sqlite");

describe("API", () => {
  let request, server, knex;

  beforeAll(async () => {
    if (fse.existsSync(TEST_SQLITE_FILE_PATH)) {
      await fse.unlink(TEST_SQLITE_FILE_PATH);
    }
    process.env.SQLITE_FILE_PATH = TEST_SQLITE_FILE_PATH;
    const { main, knex: knexInst } = require("../src/app.js");
    knex = knexInst;
    const app = await main();
    server = app.listen();
    request = supertest.agent(server);
  });

  afterAll(async () => {
    server.close();
    knex.destroy();
    await fse.unlink(TEST_SQLITE_FILE_PATH);
  });

  test("list movies", async () => {
    const res = await request.get("/movies").expect(200);
    expect(res.body).toHaveLength(2);
  });

  test("root page shoudl return hello", async () => {
    const res = await request.get("/").expect(200);
    expect(res.body).toEqual({ you: "<- are here !" });
  });
});

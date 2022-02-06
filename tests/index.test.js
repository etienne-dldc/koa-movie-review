import supertest from "supertest";
import * as path from "path";

describe("API", () => {
  let request, server, knex;

  beforeAll(async () => {
    process.env.SQLITE_FILE_PATH = path.resolve("test/data/db.sqlite");
    const { main, knex: knexInst } = require("../src/app.js");
    knex = knexInst;
    const app = await main();
    server = app.listen();
    request = supertest.agent(server);
  });

  afterAll(function () {
    server.close();
    knex.destroy();
  });

  test("list movies", async () => {
    const res = await request.get("/movies").expect(200);
    expect(res.body).toHaveLength(2);
  });
});

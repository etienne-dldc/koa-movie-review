import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config({ path: ".env" }));
expand(config({ path: ".env.local" }));

try {
  // Here we use a dynamically load the app
  // we don't want to import it because we want
  // to make sure process.env is populated before !
  const { main } = await import("./app.js");
  await main();
} catch (error) {
  console.error(error);
  process.exit();
}

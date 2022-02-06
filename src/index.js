import { config } from "dotenv";
import { expand } from "dotenv-expand";
import * as colorette from "colorette";

expand(config({ path: ".env" }));
expand(config({ path: ".env.local" }));

import("./app.js")
  .then(({ main }) => main())
  .then((app) => {
    app.listen(3001, () => {
      console.log(colorette.blue(`Server is up on http://localhost:3001`));
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

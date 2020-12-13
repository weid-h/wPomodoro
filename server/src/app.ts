import express from "express";
import { router } from "./router";
import { APIBaseRoute } from "./constants";
import { applyMigrations } from "./repository";

const app = express();

const port = 5000;

app.use(APIBaseRoute ?? "/", router);

applyMigrations()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log("APPLICATION TERMINATED");
  });

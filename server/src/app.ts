import express from "express";
import { router } from "./router";
import { APIBaseRoute } from "./constants";

const app = express();

const port = 5000;

app.use(APIBaseRoute ?? "/", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


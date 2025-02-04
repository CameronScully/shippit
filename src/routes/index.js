import { Router } from "express";

import networkRouter from "./network/index.js";

export default function () {
  const app = Router();

  networkRouter(app);

  return app;
}

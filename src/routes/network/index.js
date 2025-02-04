import { Router } from "express";

import routeRoute from "./route.js";

import updateRoute from "./update.js";

export default function (app) {
  const route = Router();
  app.use("/", route);

  routeRoute(route);

  updateRoute(route);

  return route;
}

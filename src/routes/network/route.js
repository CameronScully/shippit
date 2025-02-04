import { Router } from "express";
import { findFastestRoute } from "../services/routeService.js";

export default function (app) {
  const route = Router();
  app.use("/route", route);

  route.get("/", async (req, res, next) => {
    try {
      const { from, to } = req.query;

      if (!from || !to) {
        return res.status(400).json({ error: "Missing query parameters" });
      }

      // in memory persistence just for the sake of this exercise
      const linehaulRoutes = global.routeData;

      if (!linehaulRoutes || linehaulRoutes.length === 0) {
        return res.json([]);
      }

      const results = findFastestRoute(linehaulRoutes, from, to);

      res.json(results);
    } catch (error) {
      next(error);
    }
  });
}

import { Router } from "express";

export default function (app) {
  const route = Router();
  app.use("/update", route);

  route.post("/", async (req, res, next) => {
    try {
      const { linehall_routes } = req.body;

      // in memory persistence just for the sake of this exercise
      global.routeData = global.routeData || [];
      const results = global.routeData;

      linehall_routes.forEach((route) => {
        const existingRouteIndex = results.findIndex(
          (r) => r.from === route.from && r.to === route.to
        );

        if (existingRouteIndex !== -1) {
          results[existingRouteIndex] = route;
        } else {
          results.push(route);
        }
      });

      global.routeData = results;

      res.json(results);
    } catch (error) {
      next(error);
    }
  });
}

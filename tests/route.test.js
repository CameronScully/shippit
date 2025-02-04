// filepath: /c:/Users/camsc/shippit/tests/update.test.js
import request from "supertest";
import express from "express";
import updateRoutes from "../src/routes/network/update.js";

const app = express();
app.use(express.json());
updateRoutes(app);

describe("POST /update", () => {
  beforeEach(() => {
    global.routeData = [];
  });

  test("should update routes successfully", async () => {
    const linehall_routes = [
      { from: "Sydney", to: "Melbourne", travel_time_seconds: 120 },
      { from: "Melbourne", to: "Adelaide", travel_time_seconds: 120 },
    ];

    const response = await request(app)
      .post("/update")
      .send({ linehall_routes });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(linehall_routes);
  });

  test("should update existing routes", async () => {
    global.routeData = [
      { from: "Sydney", to: "Melbourne", travel_time_seconds: 100 },
    ];

    const linehall_routes = [
      { from: "Sydney", to: "Melbourne", travel_time_seconds: 120 },
    ];

    const response = await request(app)
      .post("/update")
      .send({ linehall_routes });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(linehall_routes);
  });

  test("should add new routes", async () => {
    global.routeData = [
      { from: "Sydney", to: "Melbourne", travel_time_seconds: 120 },
    ];

    const linehall_routes = [
      { from: "Melbourne", to: "Adelaide", travel_time_seconds: 120 },
    ];

    const response = await request(app)
      .post("/update")
      .send({ linehall_routes });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { from: "Sydney", to: "Melbourne", travel_time_seconds: 120 },
      { from: "Melbourne", to: "Adelaide", travel_time_seconds: 120 },
    ]);
  });
});

import express from "express";
import helmet from "helmet";
import cors from "cors";
import indexRouter from "./routes/index.js";
import process from "node:process";
import {
  notFoundHandler,
  globalErrorHandler,
} from "./routes/middlewares/errors.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // status checkpoints
  app.get("/status", (req, res) => res.sendStatus(200).end());
  app.head("/status", (req, res) => res.sendStatus(200).end());

  app.enable("trust proxy");

  // middlewares
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // routes
  app.use("/", indexRouter());

  // error handlers
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  app
    .listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    )
    .on("error", (error) => {
      console.log(error.message);
      process.exit(1);
    });
}

startServer();

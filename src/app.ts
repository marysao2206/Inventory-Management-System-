import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.config.js";
import { errorMiddleware, notFoundMiddleware } from "./core/middlewares/error.middleware.js";
import routes from "./routes/index.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

  app.get("/health", (_req, res) => {
    res.json({ success: true, message: "Inventory API is healthy" });
  });

  app.use(env.apiPrefix, routes);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
};

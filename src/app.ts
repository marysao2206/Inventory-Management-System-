import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { appConfig } from "./config/app.config";
import { errorMiddleware } from "./core/middlewares/error.middleware";
import { notFoundMiddleware } from "./core/middlewares/not-found.middleware";
import { routes } from "./routes";

export const app = express();

// Middleware
// ========================================
app.use(helmet()); // Security
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Read JSON data
app.use(express.urlencoded({ extended: true })); // Read form data
app.use(cookieParser()); // Read cookies
app.use(morgan("dev")); // Show logs in terminal


// ========================================
// Welcome Route
// ========================================
app.get("/", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to IMS API"
  });
});


// ========================================
// API Routes
// Example: /api/v1/products
// ========================================
app.use(appConfig.apiPrefix, routes);


// ========================================
// Error Handler
// ========================================
app.use(notFoundMiddleware);
app.use(errorMiddleware);


export default app;

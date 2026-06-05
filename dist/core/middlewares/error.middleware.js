import { ZodError } from "zod";
import { env } from "../../config/env.config.js";
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { AppError } from "../errors/app-error.js";
export const notFoundMiddleware = (req, _res, next) => {
    next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};
export const errorMiddleware = (error, _req, res, _next) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: ResponseMessage.VALIDATION_ERROR,
            errors: error.flatten()
        });
    }
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            details: error.details
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        stack: env.nodeEnv === "production" ? undefined : error.stack
    });
};

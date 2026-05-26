"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.notFoundMiddleware = void 0;
const zod_1 = require("zod");
const env_config_1 = require("../../config/env.config");
const response_message_constant_1 = require("../../constants/response-message.constant");
const app_error_1 = require("../errors/app-error");
const notFoundMiddleware = (req, _res, next) => {
    next(new app_error_1.AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};
exports.notFoundMiddleware = notFoundMiddleware;
const errorMiddleware = (error, _req, res, _next) => {
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            message: response_message_constant_1.ResponseMessage.VALIDATION_ERROR,
            errors: error.flatten()
        });
    }
    if (error instanceof app_error_1.AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            details: error.details
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        stack: env_config_1.env.nodeEnv === "production" ? undefined : error.stack
    });
};
exports.errorMiddleware = errorMiddleware;

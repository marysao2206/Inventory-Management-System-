"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_config_1 = require("./config/env.config");
const error_middleware_1 = require("./core/middlewares/error.middleware");
const routes_1 = __importDefault(require("./routes"));
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)(env_config_1.env.nodeEnv === "production" ? "combined" : "dev"));
    app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, limit: 300 }));
    app.get("/health", (_req, res) => {
        res.json({ success: true, message: "Inventory API is healthy" });
    });
    app.use(env_config_1.env.apiPrefix, routes_1.default);
    app.use(error_middleware_1.notFoundMiddleware);
    app.use(error_middleware_1.errorMiddleware);
    return app;
};
exports.createApp = createApp;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../../config/jwt.config");
const response_message_constant_1 = require("../../constants/response-message.constant");
const app_error_1 = require("../errors/app-error");
const token_blocklist_1 = require("../utils/token-blocklist");
const authMiddleware = (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return next(new app_error_1.AppError(401, response_message_constant_1.ResponseMessage.UNAUTHORIZED));
    }
    try {
        const token = header.slice("Bearer ".length);
        if ((0, token_blocklist_1.isTokenBlocked)(token)) {
            return next(new app_error_1.AppError(401, response_message_constant_1.ResponseMessage.UNAUTHORIZED));
        }
        const payload = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.secret);
        req.user = {
            id: payload.sub,
            email: payload.email,
            role: payload.role
        };
        req.authToken = token;
        req.authTokenExpiresAt = payload.exp ? payload.exp * 1000 : undefined;
        return next();
    }
    catch {
        return next(new app_error_1.AppError(401, response_message_constant_1.ResponseMessage.UNAUTHORIZED));
    }
};
exports.authMiddleware = authMiddleware;

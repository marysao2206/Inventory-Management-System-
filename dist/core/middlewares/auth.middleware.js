<<<<<<< HEAD
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../../config/jwt.config");
const response_message_constant_1 = require("../../constants/response-message.constant");
const app_error_1 = require("../errors/app-error");
const token_blocklist_1 = require("../utils/token-blocklist");
const authMiddleware = (req, _res, next) => {
=======
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.config.js";
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { AppError } from "../errors/app-error.js";
import { isTokenBlocked } from "../utils/token-blocklist.js";
export const authMiddleware = (req, _res, next) => {
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return next(new AppError(401, ResponseMessage.UNAUTHORIZED));
    }
    try {
        const token = header.slice("Bearer ".length);
        if (isTokenBlocked(token)) {
            return next(new AppError(401, ResponseMessage.UNAUTHORIZED));
        }
        const payload = jwt.verify(token, jwtConfig.secret);
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
        return next(new AppError(401, ResponseMessage.UNAUTHORIZED));
    }
};
<<<<<<< HEAD
exports.authMiddleware = authMiddleware;
const optionalAuthMiddleware = (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return next();
    }
    try {
        const token = header.slice("Bearer ".length);
        if ((0, token_blocklist_1.isTokenBlocked)(token)) {
            return next();
        }
        const payload = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.secret);
        req.user = {
            id: payload.sub,
            email: payload.email,
            role: payload.role
        };
        req.authToken = token;
        req.authTokenExpiresAt = payload.exp ? payload.exp * 1000 : undefined;
    }
    catch {
        // Logout is idempotent: expired or malformed tokens are treated as already logged out.
    }
    return next();
};
exports.optionalAuthMiddleware = optionalAuthMiddleware;
=======
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestOnlyMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../../config/jwt.config");
const app_error_1 = require("../errors/app-error");
const token_blocklist_1 = require("../utils/token-blocklist");
const guestOnlyMiddleware = (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return next();
    }
    const token = header.slice("Bearer ".length);
    if ((0, token_blocklist_1.isTokenBlocked)(token)) {
        return next();
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.secret);
        const requestedEmail = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : undefined;
        const loggedInEmail = payload.email?.trim().toLowerCase();
        if (requestedEmail && loggedInEmail === requestedEmail) {
            return next(new app_error_1.AppError(409, "You are already logged in with this email. Please logout first."));
        }
        return next(new app_error_1.AppError(409, "You are already logged in. Please logout before using another account."));
    }
    catch {
        return next();
    }
};
exports.guestOnlyMiddleware = guestOnlyMiddleware;

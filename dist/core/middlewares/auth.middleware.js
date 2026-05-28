import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.config.js";
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { AppError } from "../errors/app-error.js";
import { isTokenBlocked } from "../utils/token-blocklist.js";
export const authMiddleware = (req, _res, next) => {
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

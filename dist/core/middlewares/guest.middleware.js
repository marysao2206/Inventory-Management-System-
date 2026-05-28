import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.config.js";
import { AppError } from "../errors/app-error.js";
import { isTokenBlocked } from "../utils/token-blocklist.js";
export const guestOnlyMiddleware = (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return next();
    }
    const token = header.slice("Bearer ".length);
    if (isTokenBlocked(token)) {
        return next();
    }
    try {
<<<<<<< HEAD
        const payload = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.secret);
        const requestedEmail = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : undefined;
        const loggedInEmail = payload.email?.trim().toLowerCase();
        if (requestedEmail && loggedInEmail === requestedEmail) {
            return next(new app_error_1.AppError(409, "You are already logged in with this email. Please logout first."));
        }
        return next(new app_error_1.AppError(409, "You are already logged in. Please logout before using another account."));
=======
        jwt.verify(token, jwtConfig.secret);
        return next(new AppError(409, "You are already logged in. Please logout before using another account."));
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b
    }
    catch {
        return next();
    }
};

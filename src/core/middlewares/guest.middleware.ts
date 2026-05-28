import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.config.js";
import { AppError } from "../errors/app-error.js";
import { isTokenBlocked } from "../utils/token-blocklist.js";

interface JwtPayload extends jwt.JwtPayload {
  email?: string;
}

export const guestOnlyMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return next();
  }

  const token = header.slice("Bearer ".length);
  if (isTokenBlocked(token)) {
    return next();
  }

  try {
    const payload = jwt.verify(token, jwtConfig.secret) as JwtPayload;
    const requestedEmail = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : undefined;
    const loggedInEmail = payload.email?.trim().toLowerCase();

    if (requestedEmail && loggedInEmail === requestedEmail) {
      return next(new AppError(409, "You are already logged in with this email. Please logout first."));
    }

    return next(new AppError(409, "You are already logged in. Please logout before using another account."));
  } catch {
    return next();
  }
};

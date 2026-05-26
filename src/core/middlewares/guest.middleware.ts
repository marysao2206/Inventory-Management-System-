import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.config";
import { AppError } from "../errors/app-error";
import { isTokenBlocked } from "../utils/token-blocklist";

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
    jwt.verify(token, jwtConfig.secret);
    return next(new AppError(409, "You are already logged in. Please logout before using another account."));
  } catch {
    return next();
  }
};

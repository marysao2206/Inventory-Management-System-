import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.config";
import { ResponseMessage } from "../../constants/response-message.constant";
import { AppError } from "../errors/app-error";
import { isTokenBlocked } from "../utils/token-blocklist";

interface JwtPayload extends jwt.JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return next(new AppError(401, ResponseMessage.UNAUTHORIZED));
  }

  try {
    const token = header.slice("Bearer ".length);
    if (isTokenBlocked(token)) {
      return next(new AppError(401, ResponseMessage.UNAUTHORIZED));
    }

    const payload = jwt.verify(token, jwtConfig.secret) as JwtPayload;
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };
    req.authToken = token;
    req.authTokenExpiresAt = payload.exp ? payload.exp * 1000 : undefined;
    return next();
  } catch {
    return next(new AppError(401, ResponseMessage.UNAUTHORIZED));
  }
};

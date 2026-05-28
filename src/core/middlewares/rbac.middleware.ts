import { NextFunction, Request, Response } from "express";
import { RoleName } from "../../constants/roles.constant.js";
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { AppError } from "../errors/app-error.js";

export const rbacMiddleware = (...roles: RoleName[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, ResponseMessage.UNAUTHORIZED));
    }

    if (req.user.role === RoleName.ADMIN) {
      return next();
    }

    if (!roles.includes(req.user.role as RoleName)) {
      return next(new AppError(403, ResponseMessage.FORBIDDEN));
    }

    return next();
  };
};

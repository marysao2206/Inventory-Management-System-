import { NextFunction, Request, Response } from "express";
import { Permission, rolePermissions, RoleName } from "../../constants/roles.constant.js";
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

export const permissionMiddleware = (...permissions: Permission[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, ResponseMessage.UNAUTHORIZED));
    }

    const userRole = req.user.role as RoleName;
    const allowedPermissions = rolePermissions[userRole] ?? [];
    const hasPermission = permissions.every((permission) => allowedPermissions.includes(permission));

    if (!hasPermission) {
      return next(new AppError(403, ResponseMessage.FORBIDDEN));
    }

    return next();
  };
};

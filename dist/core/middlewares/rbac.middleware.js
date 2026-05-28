import { rolePermissions, RoleName } from "../../constants/roles.constant.js";
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { AppError } from "../errors/app-error.js";
export const rbacMiddleware = (...roles) => {
    return (req, _res, next) => {
        if (!req.user) {
            return next(new AppError(401, ResponseMessage.UNAUTHORIZED));
        }
        if (req.user.role === RoleName.ADMIN) {
            return next();
        }
        if (!roles.includes(req.user.role)) {
            return next(new AppError(403, ResponseMessage.FORBIDDEN));
        }
        return next();
    };
};
export const permissionMiddleware = (...permissions) => {
    return (req, _res, next) => {
        if (!req.user) {
            return next(new AppError(401, ResponseMessage.UNAUTHORIZED));
        }
        const userRole = req.user.role;
        const allowedPermissions = rolePermissions[userRole] ?? [];
        const hasPermission = permissions.every((permission) => allowedPermissions.includes(permission));
        if (!hasPermission) {
            return next(new AppError(403, ResponseMessage.FORBIDDEN));
        }
        return next();
    };
};

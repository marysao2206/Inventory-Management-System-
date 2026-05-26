"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rbacMiddleware = void 0;
const roles_constant_1 = require("../../constants/roles.constant");
const response_message_constant_1 = require("../../constants/response-message.constant");
const app_error_1 = require("../errors/app-error");
const rbacMiddleware = (...roles) => {
    return (req, _res, next) => {
        if (!req.user) {
            return next(new app_error_1.AppError(401, response_message_constant_1.ResponseMessage.UNAUTHORIZED));
        }
        if (req.user.role === roles_constant_1.RoleName.ADMIN) {
            return next();
        }
        if (!roles.includes(req.user.role)) {
            return next(new app_error_1.AppError(403, response_message_constant_1.ResponseMessage.FORBIDDEN));
        }
        return next();
    };
};
exports.rbacMiddleware = rbacMiddleware;

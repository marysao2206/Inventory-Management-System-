"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const response_message_constant_1 = require("../../constants/response-message.constant");
const app_error_1 = require("./app-error");
class NotFoundError extends app_error_1.AppError {
    constructor(message = response_message_constant_1.ResponseMessage.NOT_FOUND) {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;

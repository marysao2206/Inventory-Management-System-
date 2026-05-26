"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const apiResponse = (res, statusCode, message, data, meta) => {
    return res.status(statusCode).json({
        success: statusCode < 400,
        message,
        data,
        meta
    });
};
exports.apiResponse = apiResponse;

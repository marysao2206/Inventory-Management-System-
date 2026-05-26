"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const response_message_constant_1 = require("../../constants/response-message.constant");
const api_response_1 = require("../../core/utils/api-response");
const auth_service_1 = require("./auth.service");
class AuthController {
    constructor() {
        this.register = async (req, res) => {
            const data = await auth_service_1.authService.register(req.body, req.ip);
            return (0, api_response_1.apiResponse)(res, 201, response_message_constant_1.ResponseMessage.CREATED, data);
        };
        this.login = async (req, res) => {
            const data = await auth_service_1.authService.login(req.body, req.ip);
            return (0, api_response_1.apiResponse)(res, 200, response_message_constant_1.ResponseMessage.LOGIN_SUCCESS, data);
        };
        this.logout = async (req, res) => {
            const data = await auth_service_1.authService.logout(req.user.id, req.authToken, req.authTokenExpiresAt, req.ip);
            return (0, api_response_1.apiResponse)(res, 200, "Logout successful", data);
        };
        this.verifyEmail = async (req, res) => {
            const data = await auth_service_1.authService.verifyEmail(req.body, req.ip);
            return (0, api_response_1.apiResponse)(res, 200, "Email verified successfully", data);
        };
        this.resendVerification = async (req, res) => {
            const data = await auth_service_1.authService.resendVerification(req.body, req.ip);
            return (0, api_response_1.apiResponse)(res, 200, "Verification code sent", data);
        };
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();

import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { authService } from "./auth.service.js";
export class AuthController {
    constructor() {
        this.register = async (req, res) => {
            const data = await authService.register(req.body, req.ip);
            return apiResponse(res, 201, ResponseMessage.CREATED, data);
        };
        this.login = async (req, res) => {
            const data = await authService.login(req.body, req.ip);
            return apiResponse(res, 200, ResponseMessage.LOGIN_SUCCESS, data);
        };
        this.logout = async (req, res) => {
<<<<<<< HEAD
            const data = await auth_service_1.authService.logout(req.user?.id, req.authToken, req.authTokenExpiresAt, req.ip);
            return (0, api_response_1.apiResponse)(res, 200, data.message, data);
=======
            const data = await authService.logout(req.user.id, req.authToken, req.authTokenExpiresAt, req.ip);
            return apiResponse(res, 200, "Logout successful", data);
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b
        };
        this.verifyEmail = async (req, res) => {
            const data = await authService.verifyEmail(req.body, req.ip);
            return apiResponse(res, 200, "Email verified successfully", data);
        };
        this.resendVerification = async (req, res) => {
            const data = await authService.resendVerification(req.body, req.ip);
            return apiResponse(res, 200, "Verification code sent", data);
        };
    }
}
export const authController = new AuthController();

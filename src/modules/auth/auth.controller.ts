import { Request, Response } from "express";
import { ResponseMessage } from "../../constants/response-message.constant";
import { apiResponse } from "../../core/utils/api-response";
import { authService } from "./auth.service";

export class AuthController {
  register = async (req: Request, res: Response) => {
    const data = await authService.register(req.body, req.ip);
    return apiResponse(res, 201, ResponseMessage.CREATED, data);
  };

  login = async (req: Request, res: Response) => {
    const data = await authService.login(req.body, req.ip);
    return apiResponse(res, 200, ResponseMessage.LOGIN_SUCCESS, data);
  };

  logout = async (req: Request, res: Response) => {
    const data = await authService.logout(req.user?.id, req.authToken, req.authTokenExpiresAt, req.ip);
    return apiResponse(res, 200, data.message, data);
  };

  verifyEmail = async (req: Request, res: Response) => {
    const data = await authService.verifyEmail(req.body, req.ip);
    return apiResponse(res, 200, "Email verified successfully", data);
  };

  resendVerification = async (req: Request, res: Response) => {
    const data = await authService.resendVerification(req.body, req.ip);
    return apiResponse(res, 200, "Verification code sent", data);
  };
}

export const authController = new AuthController();

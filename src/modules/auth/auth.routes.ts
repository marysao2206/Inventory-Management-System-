import { Router } from "express";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { guestOnlyMiddleware } from "../../core/middlewares/guest.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { validate } from "../../core/utils/validate.js";
import { authController } from "./auth.controller.js";
import { loginSchema, registerSchema, resendVerificationSchema, verifyEmailSchema } from "./auth.dto.js";

const router = Router();

router.post("/register", guestOnlyMiddleware, validate(registerSchema), asyncHandler(authController.register));
router.post("/verify-email", validate(verifyEmailSchema), asyncHandler(authController.verifyEmail));
router.post("/resend-verification", validate(resendVerificationSchema), asyncHandler(authController.resendVerification));
router.post("/login", guestOnlyMiddleware, validate(loginSchema), asyncHandler(authController.login));
router.post("/logout", authMiddleware, asyncHandler(authController.logout));
router.get("/logout", authMiddleware, asyncHandler(authController.logout));

export default router;

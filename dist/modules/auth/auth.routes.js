<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../core/middlewares/auth.middleware");
const guest_middleware_1 = require("../../core/middlewares/guest.middleware");
const async_handler_1 = require("../../core/utils/async-handler");
const validate_1 = require("../../core/utils/validate");
const auth_controller_1 = require("./auth.controller");
const auth_dto_1 = require("./auth.dto");
const router = (0, express_1.Router)();
router.post("/register", guest_middleware_1.guestOnlyMiddleware, (0, validate_1.validate)(auth_dto_1.registerSchema), (0, async_handler_1.asyncHandler)(auth_controller_1.authController.register));
router.post("/verify-email", (0, validate_1.validate)(auth_dto_1.verifyEmailSchema), (0, async_handler_1.asyncHandler)(auth_controller_1.authController.verifyEmail));
router.post("/resend-verification", (0, validate_1.validate)(auth_dto_1.resendVerificationSchema), (0, async_handler_1.asyncHandler)(auth_controller_1.authController.resendVerification));
router.post("/login", guest_middleware_1.guestOnlyMiddleware, (0, validate_1.validate)(auth_dto_1.loginSchema), (0, async_handler_1.asyncHandler)(auth_controller_1.authController.login));
router.post("/logout", auth_middleware_1.optionalAuthMiddleware, (0, async_handler_1.asyncHandler)(auth_controller_1.authController.logout));
router.get("/logout", auth_middleware_1.optionalAuthMiddleware, (0, async_handler_1.asyncHandler)(auth_controller_1.authController.logout));
exports.default = router;
=======
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
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b

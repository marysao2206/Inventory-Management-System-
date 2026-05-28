<<<<<<< HEAD
"use strict";
=======
import { Router } from "express";
import { RoleName } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { validate } from "../../core/utils/validate.js";
import { createPaymentSchema, updatePaymentSchema } from "./payment.dto.js";
import { paymentController } from "./payment.controller.js";
const router = Router();
router.use(authMiddleware, rbacMiddleware(RoleName.ADMIN));
router.get("/", asyncHandler(paymentController.findAll));
router.get("/:id", asyncHandler(paymentController.findById));
router.post("/", validate(createPaymentSchema), asyncHandler(paymentController.create));
router.patch("/:id", validate(updatePaymentSchema), asyncHandler(paymentController.update));
router.delete("/:id", asyncHandler(paymentController.remove));
export default router;
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b

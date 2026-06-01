import { Router } from "express";
import { Permission } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { permissionMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { validate } from "../../core/utils/validate.js";
import { checkTransactionSchema, createPaymentSchema, generateQRSchema, updatePaymentSchema } from "./payment.dto.js";
import { paymentController } from "./payment.controller.js";

const router = Router();

// generate qr
router.post("/generate-qr", authMiddleware, validate(generateQRSchema), asyncHandler(paymentController.generateQR));
router.post("/generate-qr-image", authMiddleware, validate(generateQRSchema), asyncHandler(paymentController.generateQRImage));
router.post("/check-transaction", authMiddleware, validate(checkTransactionSchema), asyncHandler(paymentController.checkTransaction));
router.use(authMiddleware);
router.get("/", permissionMiddleware(Permission.PAYMENTS_READ), asyncHandler(paymentController.findAll));
router.get("/:id", permissionMiddleware(Permission.PAYMENTS_READ), asyncHandler(paymentController.findById));
router.post("/", permissionMiddleware(Permission.PAYMENTS_CREATE), validate(createPaymentSchema), asyncHandler(paymentController.create));
router.patch("/:id", permissionMiddleware(Permission.PAYMENTS_UPDATE), validate(updatePaymentSchema), asyncHandler(paymentController.update));
router.delete("/:id", permissionMiddleware(Permission.PAYMENTS_DELETE), asyncHandler(paymentController.remove));

export default router;

import { Router } from "express";
import { RoleName } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { validate } from "../../core/utils/validate.js";
import { orderController } from "./order.controller.js";
import { createOrderSchema, updateOrderSchema } from "./order.dto.js";

const router = Router();

router.use(authMiddleware, rbacMiddleware(RoleName.ADMIN));
router.get("/", asyncHandler(orderController.findAll));
router.get("/:id", asyncHandler(orderController.findById));
router.post("/", validate(createOrderSchema), asyncHandler(orderController.create));
router.patch("/:id", validate(updateOrderSchema), asyncHandler(orderController.update));
router.delete("/:id", asyncHandler(orderController.remove));

export default router;
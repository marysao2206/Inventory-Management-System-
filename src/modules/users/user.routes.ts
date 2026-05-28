import { Router } from "express";
import { RoleName } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { validate } from "../../core/utils/validate.js";
import { createUserSchema, updateUserSchema } from "./user.dto.js";
import { userController } from "./user.controller.js";

const router = Router();

router.use(authMiddleware, rbacMiddleware(RoleName.ADMIN));
router.get("/", asyncHandler(userController.findAll));
router.get("/:id", asyncHandler(userController.findById));
router.post("/", validate(createUserSchema), asyncHandler(userController.create));
router.patch("/:id", validate(updateUserSchema), asyncHandler(userController.update));
router.delete("/:id", asyncHandler(userController.remove));

export default router;

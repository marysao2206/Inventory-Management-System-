import { Router } from "express";
import { RoleName } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { validate } from "../../core/utils/validate.js";
import { categoryController } from "./category.controller.js";
import { createCategorySchema, updateCategorySchema } from "./category.dto.js";

const router = Router();

router.use(authMiddleware, rbacMiddleware(RoleName.ADMIN));
router.get("/", asyncHandler(categoryController.findAll));
router.get("/:id", asyncHandler(categoryController.findById));
router.post("/", validate(createCategorySchema), asyncHandler(categoryController.create));
router.patch("/:id", validate(updateCategorySchema), asyncHandler(categoryController.update));
router.delete("/:id", asyncHandler(categoryController.remove));

export default router;
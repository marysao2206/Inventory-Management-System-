import { Router } from "express";
import { RoleName } from "../../constants/roles.constant";
import { authMiddleware } from "../../core/middlewares/auth.middleware";
import { rbacMiddleware } from "../../core/middlewares/rbac.middleware";
import { asyncHandler } from "../../core/utils/async-handler";
import { validate } from "../../core/utils/validate";
import { createUserSchema, updateUserSchema } from "./user.dto";
import { userController } from "./user.controller";

const router = Router();

router.use(authMiddleware, rbacMiddleware(RoleName.ADMIN));
router.get("/", asyncHandler(userController.findAll));
router.get("/:id", asyncHandler(userController.findById));
router.post("/", validate(createUserSchema), asyncHandler(userController.create));
router.patch("/:id", validate(updateUserSchema), asyncHandler(userController.update));
router.delete("/:id", asyncHandler(userController.remove));

export default router;

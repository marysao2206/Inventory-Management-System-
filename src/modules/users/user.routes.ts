import { Router } from "express";
import { Permission } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { permissionMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { validate } from "../../core/utils/validate.js";
import { createUserSchema, updateUserSchema } from "./user.dto.js";
import { userController } from "./user.controller.js";

const router = Router();

router.use(authMiddleware);
router.get("/", permissionMiddleware(Permission.USERS_READ), asyncHandler(userController.findAll));
router.get("/:id", permissionMiddleware(Permission.USERS_READ), asyncHandler(userController.findById));
router.post("/", permissionMiddleware(Permission.USERS_CREATE), validate(createUserSchema), asyncHandler(userController.create));
router.patch("/:id", permissionMiddleware(Permission.USERS_UPDATE), validate(updateUserSchema), asyncHandler(userController.update));
router.delete("/:id", permissionMiddleware(Permission.USERS_DELETE), asyncHandler(userController.remove));

export default router;

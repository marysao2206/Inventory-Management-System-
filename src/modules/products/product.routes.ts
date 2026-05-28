import { Router } from "express";
import { Permission } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { permissionMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { validate } from "../../core/utils/validate.js";
import { productController } from "./product.controller.js";
import { createProductSchema, updateProductSchema } from "./product.dto.js";

const router = Router();

router.use(authMiddleware);
router.get("/", permissionMiddleware(Permission.PRODUCTS_READ), asyncHandler(productController.findAll));
router.get("/:id", permissionMiddleware(Permission.PRODUCTS_READ), asyncHandler(productController.findById));
router.post("/", permissionMiddleware(Permission.PRODUCTS_CREATE), validate(createProductSchema), asyncHandler(productController.create));
router.patch("/:id", permissionMiddleware(Permission.PRODUCTS_UPDATE), validate(updateProductSchema), asyncHandler(productController.update));
router.delete("/:id", permissionMiddleware(Permission.PRODUCTS_DELETE), asyncHandler(productController.remove));

export default router;

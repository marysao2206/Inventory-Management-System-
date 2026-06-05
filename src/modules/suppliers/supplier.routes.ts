import { Router } from "express";
import { Permission } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { permissionMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { validate } from "../../core/utils/validate.js";
import { supplierController } from "./supplier.controller.js";
import { createSupplierSchema, updateSupplierSchema } from "./supplier.dto.js";

const router = Router();

router.use(authMiddleware);
router.get("/", permissionMiddleware(Permission.SUPPLIERS_READ), asyncHandler(supplierController.findAll));
router.get("/:id", permissionMiddleware(Permission.SUPPLIERS_READ), asyncHandler(supplierController.findById));
router.post("/", permissionMiddleware(Permission.SUPPLIERS_CREATE), validate(createSupplierSchema), asyncHandler(supplierController.create));
router.patch("/:id", permissionMiddleware(Permission.SUPPLIERS_UPDATE), validate(updateSupplierSchema), asyncHandler(supplierController.update));
router.delete("/:id", permissionMiddleware(Permission.SUPPLIERS_DELETE), asyncHandler(supplierController.remove));

export default router;

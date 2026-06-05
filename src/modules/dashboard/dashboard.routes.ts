import { Router } from "express";
import { Permission } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { permissionMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { dashboardController } from "./dashboard.controller.js";

const router = Router();

router.use(authMiddleware);
router.use(permissionMiddleware(Permission.INVENTORY_READ));

router.get("/", asyncHandler(dashboardController.getOverview));
router.get("/stock-overview", asyncHandler(dashboardController.getStockOverview));
router.get("/alerts", asyncHandler(dashboardController.getAlerts));
router.get("/purchasing", asyncHandler(dashboardController.getPurchasingData));

export default router;

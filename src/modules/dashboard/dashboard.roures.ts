import { Router } from "express";
import { Permission } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { permissionMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { dashboardController } from "./dashboard.controller.js";

const router = Router();

// All dashboard routes require authentication and inventory read permission
router.use(authMiddleware);
router.use(permissionMiddleware(Permission.INVENTORY_READ));

/**
 * Complete dashboard overview
 * GET /api/dashboard
 * Includes: stock overview, alerts, and purchasing data
 */
router.get("/", asyncHandler(dashboardController.getOverview));

/**
 * Real-time stock overview only
 * GET /api/dashboard/stock-overview
 * - Total unique active products (SKU count)
 * - Total inventory value
 * - Stock breakdown by category with percentages
 */
router.get("/stock-overview", asyncHandler(dashboardController.getStockOverview));

/**
 * Actionable alerts & notifications
 * GET /api/dashboard/alerts
 * - Low stock products (approaching minimum threshold)
 * - Out of stock items (ranked by sales velocity)
 * - Overstock/slow-moving inventory (excess stock tying up capital)
 * - Expiring stock (if applicable for perishable items)
 */
router.get("/alerts", asyncHandler(dashboardController.getAlerts));

/**
 * Purchasing & supplier management
 * GET /api/dashboard/purchasing
 * - Pending purchase orders (POs not yet arrived)
 * - Lead time metrics (expected delivery dates, reliability)
 * - Supplier performance (on-time rates, quality scores, risk assessment)
 */
router.get("/purchasing", asyncHandler(dashboardController.getPurchasingData));

export default router;

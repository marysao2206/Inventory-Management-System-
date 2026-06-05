import type { Request, Response } from "express";
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { dashboardService } from "./dashboard.service.js";
import type { DashboardFiltersDto } from "./dashboard.dto.js";

class DashboardController {
  /**
   * Get complete dashboard overview
   * GET /api/dashboard
   */
  getOverview = async (req: Request, res: Response) => {
    const filters = this.buildFilters(req);
    const overview = await dashboardService.getDashboardOverview(filters);
    return apiResponse(res, 200, ResponseMessage.FETCHED, overview);
  };

  /**
   * Get real-time stock overview only
   * GET /api/dashboard/stock-overview
   */
  getStockOverview = async (req: Request, res: Response) => {
    const filters = this.buildFilters(req);
    const overview = await dashboardService.getRealTimeStockOverview(filters);
    return apiResponse(res, 200, ResponseMessage.FETCHED, overview);
  };

  /**
   * Get actionable alerts & notifications
   * GET /api/dashboard/alerts
   */
  getAlerts = async (req: Request, res: Response) => {
    const filters = this.buildFilters(req);
    const alerts = await dashboardService.getActionableAlerts(filters);
    return apiResponse(res, 200, ResponseMessage.FETCHED, alerts);
  };

  /**
   * Get purchasing & supplier management data
   * GET /api/dashboard/purchasing
   */
  getPurchasingData = async (req: Request, res: Response) => {
    const filters = this.buildFilters(req);
    const data = await dashboardService.getPurchasingAndSupplierData(filters);
    return apiResponse(res, 200, ResponseMessage.FETCHED, data);
  };

  /**
   * Helper method to build filters from query parameters
   */
  private buildFilters(req: Request): DashboardFiltersDto | undefined {
    const { categoryId, supplierId, warehouseLocation, severity } = req.query;

    if (!categoryId && !supplierId && !warehouseLocation && !severity) {
      return undefined;
    }

    return {
      categoryId: categoryId ? String(categoryId) : undefined,
      supplierId: supplierId ? String(supplierId) : undefined,
      warehouseLocation: warehouseLocation ? String(warehouseLocation) : undefined,
      alertSeverity: severity ? (String(severity) as "CRITICAL" | "HIGH" | "MEDIUM" | "LOW") : undefined,
    };
  }
}

export const dashboardController = new DashboardController();

import { dashboardRepository } from "./dashboard.repository.js";
import type {
  DashboardOverviewDto,
  DashboardFiltersDto,
  RealTimeStockOverviewDto,
  ActionableAlertsDto,
  PurchasingAndSupplierDto,
} from "./dashboard.dto.js";

class DashboardService {
  /**
   * Get complete dashboard overview with all three sections
   */
  async getDashboardOverview(filters?: DashboardFiltersDto): Promise<DashboardOverviewDto> {
    const [realTimeStockOverview, actionableAlerts, purchasingAndSupplier] = await Promise.all([
      this.getRealTimeStockOverview(filters),
      this.getActionableAlerts(filters),
      this.getPurchasingAndSupplierData(filters),
    ]);

    return {
      realTimeStockOverview,
      actionableAlerts,
      purchasingAndSupplier,
      lastUpdated: new Date(),
    };
  }

  /**
   * Get real-time stock overview
   * - Total unique active products (SKU count)
   * - Total inventory value
   * - Stock breakdown by category
   */
  async getRealTimeStockOverview(filters?: DashboardFiltersDto): Promise<RealTimeStockOverviewDto> {
    return dashboardRepository.getRealTimeStockOverview(filters);
  }

  /**
   * Get actionable alerts & notifications
   * - Low stock alerts
   * - Out of stock items
   * - Overstock/slow-moving inventory
   * - Expiring stock (if applicable)
   */
  async getActionableAlerts(filters?: DashboardFiltersDto): Promise<ActionableAlertsDto> {
    return dashboardRepository.getActionableAlerts(filters);
  }

  /**
   * Get purchasing & supplier management data
   * - Pending purchase orders
   * - Lead time metrics
   * - Supplier performance metrics
   */
  async getPurchasingAndSupplierData(filters?: DashboardFiltersDto): Promise<PurchasingAndSupplierDto> {
    return dashboardRepository.getPurchasingAndSupplierData(filters);
  }
}

export const dashboardService = new DashboardService();

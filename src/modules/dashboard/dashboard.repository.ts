import { AppDataSource } from "../../database/data-source.js";
import { Product } from "../products/product.entity.js";
import { InventoryItem } from "../inventory/inventory.entity.js";
import { Category } from "../categories/category.entity.js";
import { Order } from "../orders/order.entity.js";
import { Supplier } from "../suppliers/supplier.entity.js";
import {
  RealTimeStockOverviewDto,
  StockByCategoryDto,
  ActionableAlertsDto,
  LowStockAlertDto,
  OutOfStockItemDto,
  OverstockAlertDto,
  ExpiringStockAlertDto,
  PurchasingAndSupplierDto,
  PendingOrderDto,
  LeadTimeMetricsDto,
  SupplierPerformanceDto,
  DashboardFiltersDto,
} from "./dashboard.dto.js";

class DashboardRepository {
  private productRepository = AppDataSource.getRepository(Product);
  private inventoryRepository = AppDataSource.getRepository(InventoryItem);
  private categoryRepository = AppDataSource.getRepository(Category);
  private orderRepository = AppDataSource.getRepository(Order);
  private supplierRepository = AppDataSource.getRepository(Supplier);

  // Real-Time Stock Overview
  async getRealTimeStockOverview(filters?: DashboardFiltersDto): Promise<RealTimeStockOverviewDto> {
    try {
      // Get total SKU count
      const totalSkuCount = await this.productRepository.count();

      // Get stock by category
      const stockByCategory = await this.getStockByCategory(filters?.categoryId);

      // Calculate total inventory value
      const totalInventoryValue = stockByCategory.reduce(
        (sum, item) => sum + parseFloat(item.totalValue || "0"),
        0
      );

      return {
        totalSkuCount,
        totalInventoryValue: totalInventoryValue.toString(),
        stockByCategory,
      };
    } catch (error) {
      console.error("Error in getRealTimeStockOverview:", error);
      return {
        totalSkuCount: 0,
        totalInventoryValue: "0",
        stockByCategory: [],
      };
    }
  }

  private async getStockByCategory(categoryId?: string): Promise<StockByCategoryDto[]> {
    try {
      // Get all categories
      const categories = await this.categoryRepository.find();

      const stockByCategory: StockByCategoryDto[] = [];
      let totalInventoryValue = 0;

      for (const category of categories) {
        if (categoryId && category.id !== categoryId) {
          continue;
        }

        // Get products in this category
        const products = await this.productRepository.find({
          where: { category: { id: category.id } },
        });

        let categoryQuantity = 0;
        let categoryValue = 0;

        // Get inventory for each product
        for (const product of products) {
          const inventory = await this.inventoryRepository.findOne({
            where: { productId: product.id },
          });

          if (inventory && inventory.quantity) {
            categoryQuantity += inventory.quantity;
            const productValue = (inventory.quantity * parseFloat(product.price || "0"));
            categoryValue += productValue;
          }
        }

        totalInventoryValue += categoryValue;

        stockByCategory.push({
          categoryId: category.id,
          categoryName: category.name,
          itemCount: products.length,
          totalQuantity: categoryQuantity,
          totalValue: categoryValue.toString(),
          percentageOfTotal: 0, // Will be calculated after all categories
        });
      }

      // Calculate percentages
      return stockByCategory.map((item) => ({
        ...item,
        percentageOfTotal: totalInventoryValue > 0 ? (parseFloat(item.totalValue) / totalInventoryValue) * 100 : 0,
      }));
    } catch (error) {
      console.error("Error in getStockByCategory:", error);
      return [];
    }
  }

  // Actionable Alerts & Notifications
  async getActionableAlerts(filters?: DashboardFiltersDto): Promise<ActionableAlertsDto> {
    try {
      const [lowStockAlerts, outOfStockItems, overstockAlerts, expiringStockAlerts] =
        await Promise.all([
          this.getLowStockAlerts(filters),
          this.getOutOfStockItems(filters),
          this.getOverstockAlerts(filters),
          this.getExpiringStockAlerts(filters),
        ]);

      return {
        lowStockAlerts,
        outOfStockItems,
        overstockAlerts,
        expiringStockAlerts,
        totalAlerts:
          lowStockAlerts.length +
          outOfStockItems.length +
          overstockAlerts.length +
          expiringStockAlerts.length,
      };
    } catch (error) {
      console.error("Error in getActionableAlerts:", error);
      return {
        lowStockAlerts: [],
        outOfStockItems: [],
        overstockAlerts: [],
        expiringStockAlerts: [],
        totalAlerts: 0,
      };
    }
  }

  private async getLowStockAlerts(filters?: DashboardFiltersDto): Promise<LowStockAlertDto[]> {
    try {
      const items = await this.inventoryRepository.find({
        where: { status: "LOW_STOCK" },
      });

      const alerts: LowStockAlertDto[] = [];

      for (const item of items) {
        if (!item.productId) continue;

        const product = await this.productRepository.findOne({
          where: { id: item.productId },
          relations: { category: true },
        });

        if (product) {
          alerts.push({
            productId: product.id,
            productName: product.name,
            sku: product.sku,
            currentQuantity: item.quantity || 0,
            minimumThreshold: Math.ceil((item.quantity || 0) * 1.5),
            categoryName: product.category?.name || "Unknown",
            priority: (item.quantity || 0) < 5 ? "HIGH" : "MEDIUM",
            daysToStockOut: 7,
          });
        }
      }

      return alerts;
    } catch (error) {
      console.error("Error in getLowStockAlerts:", error);
      return [];
    }
  }

  private async getOutOfStockItems(filters?: DashboardFiltersDto): Promise<OutOfStockItemDto[]> {
    try {
      const items = await this.inventoryRepository.find({
        where: { status: "OUT_OF_STOCK" },
      });

      const alerts: OutOfStockItemDto[] = [];

      for (const item of items) {
        if (!item.productId) continue;

        const product = await this.productRepository.findOne({
          where: { id: item.productId },
          relations: { category: true },
        });

        if (product) {
          alerts.push({
            productId: product.id,
            productName: product.name,
            sku: product.sku,
            categoryName: product.category?.name || "Unknown",
            lastStockDate: item.updatedAt,
            estimatedRestockDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            salesVelocity: 5,
            priority: "CRITICAL",
          });
        }
      }

      return alerts;
    } catch (error) {
      console.error("Error in getOutOfStockItems:", error);
      return [];
    }
  }

  private async getOverstockAlerts(filters?: DashboardFiltersDto): Promise<OverstockAlertDto[]> {
    try {
      const items = await this.inventoryRepository.find({
        where: { status: "IN_STOCK" },
      });

      const alerts: OverstockAlertDto[] = [];
      const recommendedQty = 50;

      for (const item of items) {
        if (!item.productId || (item.quantity || 0) <= 100) continue;

        const product = await this.productRepository.findOne({
          where: { id: item.productId },
          relations: { category: true },
        });

        if (product) {
          const daysSinceUpdate = Math.floor(
            (Date.now() - (item.updatedAt?.getTime() || 0)) / (1000 * 60 * 60 * 24)
          );

          // Only show items not moved in 30+ days
          if (daysSinceUpdate > 30) {
            const excessQty = (item.quantity || 0) - recommendedQty;
            const excessValue = excessQty * parseFloat(product.price || "0");

            alerts.push({
              productId: product.id,
              productName: product.name,
              sku: product.sku,
              currentQuantity: item.quantity || 0,
              recommendedQuantity: recommendedQty,
              excessQuantity: excessQty,
              excessValue: excessValue.toString(),
              slowMovingDays: daysSinceUpdate,
              categoryName: product.category?.name || "Unknown",
            });
          }
        }
      }

      return alerts;
    } catch (error) {
      console.error("Error in getOverstockAlerts:", error);
      return [];
    }
  }

  private async getExpiringStockAlerts(filters?: DashboardFiltersDto): Promise<ExpiringStockAlertDto[]> {
    // Not implemented until expiration_date field is added to inventory
    return [];
  }

  // Purchasing & Supplier Management
  async getPurchasingAndSupplierData(filters?: DashboardFiltersDto): Promise<PurchasingAndSupplierDto> {
    try {
      const [pendingOrders, leadTimeMetrics, supplierPerformance] = await Promise.all([
        this.getPendingOrders(filters),
        this.getLeadTimeMetrics(filters),
        this.getSupplierPerformance(filters),
      ]);

      const totalPendingValue = pendingOrders.reduce(
        (sum, order) => sum + parseFloat(order.totalAmount || "0"),
        0
      );

      const avgLeadTime =
        leadTimeMetrics.length > 0
          ? leadTimeMetrics.reduce((sum, metric) => sum + metric.averageLeadTimeDays, 0) /
            leadTimeMetrics.length
          : 0;

      return {
        pendingOrders,
        leadTimeMetrics,
        supplierPerformance,
        totalPendingValue: totalPendingValue.toString(),
        averageLeadTime: Math.round(avgLeadTime),
      };
    } catch (error) {
      console.error("Error in getPurchasingAndSupplierData:", error);
      return {
        pendingOrders: [],
        leadTimeMetrics: [],
        supplierPerformance: [],
        totalPendingValue: "0",
        averageLeadTime: 0,
      };
    }
  }

  private async getPendingOrders(filters?: DashboardFiltersDto): Promise<PendingOrderDto[]> {
    try {
      const orders = await this.orderRepository.find({
        where: { status: "PENDING" },
      });

      return orders.map((order) => {
        const createdDate = new Date(order.createdAt);
        const expectedDelivery = new Date(createdDate.getTime() + 14 * 24 * 60 * 60 * 1000);
        const daysOverdue = Math.max(
          0,
          Math.floor((Date.now() - expectedDelivery.getTime()) / (1000 * 60 * 60 * 24))
        );

        return {
          orderId: order.id,
          supplierId: "SUPPLIER_001",
          supplierName: "Pending Supplier",
          orderDate: createdDate,
          expectedDeliveryDate: expectedDelivery,
          totalAmount: order.totalAmount,
          status: order.status,
          itemCount: 1,
          priority:
            daysOverdue > 7 ? "URGENT" : daysOverdue > 3 ? "HIGH" : "NORMAL",
          daysOverdue: daysOverdue > 0 ? daysOverdue : undefined,
        };
      });
    } catch (error) {
      console.error("Error in getPendingOrders:", error);
      return [];
    }
  }

  private async getLeadTimeMetrics(filters?: DashboardFiltersDto): Promise<LeadTimeMetricsDto[]> {
    try {
      const suppliers = await this.supplierRepository.find();

      return suppliers.map((supplier) => ({
        supplierId: supplier.id,
        supplierName: supplier.name,
        averageLeadTimeDays: 14,
        lastOrderDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        nextExpectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        reliabilityScore: 85,
        onTimeDeliveryRate: 85,
        outstandingOrdersCount: 2,
      }));
    } catch (error) {
      console.error("Error in getLeadTimeMetrics:", error);
      return [];
    }
  }

  private async getSupplierPerformance(filters?: DashboardFiltersDto): Promise<SupplierPerformanceDto[]> {
    try {
      const suppliers = await this.supplierRepository.find();

      return suppliers.map((supplier) => ({
        supplierId: supplier.id,
        supplierName: supplier.name,
        totalOrdersCount: 10,
        completedOrdersCount: 8,
        averageDeliveryTime: 14,
        onTimeDeliveryRate: 80,
        qualityScore: 85,
        lastOrderDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        totalOrderValue: "50000",
        riskLevel: "LOW",
      }));
    } catch (error) {
      console.error("Error in getSupplierPerformance:", error);
      return [];
    }
  }
}

export const dashboardRepository = new DashboardRepository();

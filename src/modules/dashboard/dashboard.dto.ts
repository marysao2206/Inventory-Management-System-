// Real-Time Stock Overview
export interface RealTimeStockOverviewDto {
  totalSkuCount: number;
  totalInventoryValue: string;
  stockByCategory: StockByCategoryDto[];
}

export interface StockByCategoryDto {
  categoryId: string;
  categoryName: string;
  itemCount: number;
  totalQuantity: number;
  totalValue: string;
  percentageOfTotal: number;
}

// Actionable Alerts & Notifications
export interface ActionableAlertsDto {
  lowStockAlerts: LowStockAlertDto[];
  outOfStockItems: OutOfStockItemDto[];
  overstockAlerts: OverstockAlertDto[];
  expiringStockAlerts: ExpiringStockAlertDto[];
  totalAlerts: number;
}

export interface LowStockAlertDto {
  productId: string;
  productName: string;
  sku: string;
  currentQuantity: number;
  minimumThreshold: number;
  categoryName: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  daysToStockOut?: number;
}

export interface OutOfStockItemDto {
  productId: string;
  productName: string;
  sku: string;
  categoryName: string;
  lastStockDate?: Date;
  estimatedRestockDate?: Date;
  salesVelocity: number; // Units sold per day
  priority: "CRITICAL" | "HIGH";
}

export interface OverstockAlertDto {
  productId: string;
  productName: string;
  sku: string;
  currentQuantity: number;
  recommendedQuantity: number;
  excessQuantity: number;
  excessValue: string;
  slowMovingDays: number;
  categoryName: string;
}

export interface ExpiringStockAlertDto {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  expirationDate: Date;
  daysUntilExpiration: number;
  categoryName: string;
  batchNumber?: string;
}

// Purchasing & Supplier Management
export interface PurchasingAndSupplierDto {
  pendingOrders: PendingOrderDto[];
  leadTimeMetrics: LeadTimeMetricsDto[];
  supplierPerformance: SupplierPerformanceDto[];
  totalPendingValue: string;
  averageLeadTime: number; // in days
}

export interface PendingOrderDto {
  orderId: string;
  supplierId: string;
  supplierName: string;
  orderDate: Date;
  expectedDeliveryDate: Date;
  totalAmount: string;
  status: string;
  itemCount: number;
  priority: "URGENT" | "HIGH" | "NORMAL" | "LOW";
  daysOverdue?: number;
}

export interface LeadTimeMetricsDto {
  supplierId: string;
  supplierName: string;
  averageLeadTimeDays: number;
  lastOrderDate?: Date;
  nextExpectedDelivery?: Date;
  reliabilityScore: number; // 0-100
  onTimeDeliveryRate: number; // percentage
  outstandingOrdersCount: number;
}

export interface SupplierPerformanceDto {
  supplierId: string;
  supplierName: string;
  totalOrdersCount: number;
  completedOrdersCount: number;
  averageDeliveryTime: number; // in days
  onTimeDeliveryRate: number; // percentage
  qualityScore: number; // 0-100 based on defects/returns
  lastOrderDate?: Date;
  totalOrderValue: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH"; // Based on performance
}

// Complete Dashboard Response
export interface DashboardOverviewDto {
  realTimeStockOverview: RealTimeStockOverviewDto;
  actionableAlerts: ActionableAlertsDto;
  purchasingAndSupplier: PurchasingAndSupplierDto;
  lastUpdated: Date;
}

// Query filters
export interface DashboardFiltersDto {
  categoryId?: string;
  supplierId?: string;
  warehouseLocation?: string;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  alertSeverity?: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}

import type { InventoryStatus } from "./inventory.entity.js";

export interface CreateInventoryDto {
  productId: string;
  warehouseLocation?: string;
  quantity: number;
  status?: InventoryStatus;
}

export interface UpdateInventoryDto {
  productId?: string;
  warehouseLocation?: string;
  quantity?: number;
  status?: InventoryStatus;
}

export interface ReceiveStockDto {
  productId: string;
  supplierId: string;
  quantity: number;
  unitPrice: number;
  warehouseLocation?: string;
  note?: string;
}

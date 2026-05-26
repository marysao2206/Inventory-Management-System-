import type { InventoryStatus } from './inventory.entity.js';

export interface CreateInventoryDto {
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  details?: string;
  status?: InventoryStatus;
}

export interface UpdateInventoryDto {
  name?: string;
  sku?: string;
  quantity?: number;
  unitPrice?: number;
  details?: string;
  status?: InventoryStatus;
}

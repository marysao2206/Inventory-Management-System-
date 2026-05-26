export type InventoryStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'damaged';

export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  details?: string;
  status: InventoryStatus;
  updatedAt: string;
}

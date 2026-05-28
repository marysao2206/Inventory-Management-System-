export const InventoryStatus = {
  IN_STOCK: "in_stock",
  LOW_STOCK: "low_stock",
  OUT_OF_STOCK: "out_of_stock",
  DAMAGED: "damaged"
} as const;

export type InventoryStatusValue = (typeof InventoryStatus)[keyof typeof InventoryStatus];

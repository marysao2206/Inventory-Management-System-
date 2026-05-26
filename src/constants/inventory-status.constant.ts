export enum InventoryStatus {
  IN_STOCK = "IN_STOCK",
  LOW_STOCK = "LOW_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  RESERVED = "RESERVED"
}

export enum InventoryActionType {
  STOCK_IN = "stock_in",
  STOCK_OUT = "stock_out",
  ADJUSTMENT = "adjustment",
  DAMAGED = "damaged",
  RETURNED = "returned"
}

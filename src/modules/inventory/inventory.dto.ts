import { InventoryStatusValue } from "../../constants/inventory-status.constant";

export interface CreateInventoryDto {
  productId: string;
  warehouseLocation: string;
  quantity: number;
  status?: InventoryStatusValue;
}

export interface UpdateInventoryDto extends Partial<CreateInventoryDto> {}

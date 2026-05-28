import AppDataSource from "../../database/data-source";
import { InventoryItem } from "./inventory.entity";

export const inventoryRepository = AppDataSource.getRepository(InventoryItem);

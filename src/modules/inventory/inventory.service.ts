import type { CreateInventoryDto, ReceiveStockDto, UpdateInventoryDto } from "./inventory.dto.js";
import { inventoryRepository } from "./inventory.repository.js";

class InventoryService {
  listItems() {
    return inventoryRepository.listItems();
  }

  getItemById(id: string) {
    return inventoryRepository.findItemById(id);
  }

  createItem(payload: CreateInventoryDto, userId?: string) {
    return inventoryRepository.createItem(payload, userId);
  }

  updateItem(id: string, payload: UpdateInventoryDto, userId?: string) {
    return inventoryRepository.updateItem(id, payload, userId);
  }

  removeItem(id: string, userId?: string) {
    return inventoryRepository.removeItem(id, userId);
  }

  listLogs() {
    return inventoryRepository.listLogs();
  }

  listStocks() {
    return inventoryRepository.listStocks();
  }

  receiveStock(payload: ReceiveStockDto, userId?: string) {
    return inventoryRepository.receiveStock(payload, userId);
  }
}

export const inventoryService = new InventoryService();

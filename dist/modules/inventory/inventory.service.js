import { inventoryRepository } from "./inventory.repository.js";
class InventoryService {
    listItems() {
        return inventoryRepository.listItems();
    }
    getItemById(id) {
        return inventoryRepository.findItemById(id);
    }
    createItem(payload, userId) {
        return inventoryRepository.createItem(payload, userId);
    }
    updateItem(id, payload, userId) {
        return inventoryRepository.updateItem(id, payload, userId);
    }
    removeItem(id, userId) {
        return inventoryRepository.removeItem(id, userId);
    }
    listLogs() {
        return inventoryRepository.listLogs();
    }
    listStocks() {
        return inventoryRepository.listStocks();
    }
    receiveStock(payload, userId) {
        return inventoryRepository.receiveStock(payload, userId);
    }
}
export const inventoryService = new InventoryService();

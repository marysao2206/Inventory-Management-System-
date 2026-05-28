"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryService = void 0;
const inventory_repository_js_1 = require("./inventory.repository.js");
class InventoryService {
    list() {
        return inventory_repository_js_1.inventoryRepository.list();
    }
    getById(id) {
        return inventory_repository_js_1.inventoryRepository.findById(id);
    }
    create(payload) {
        return inventory_repository_js_1.inventoryRepository.create(payload);
    }
    update(id, payload) {
        return inventory_repository_js_1.inventoryRepository.update(id, payload);
    }
    remove(id) {
        return inventory_repository_js_1.inventoryRepository.remove(id);
    }
}
exports.inventoryService = new InventoryService();

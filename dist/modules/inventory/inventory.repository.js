"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryRepository = void 0;
const toStatus = (quantity, explicit) => {
    if (explicit)
        return explicit;
    if (quantity <= 0)
        return 'out_of_stock';
    if (quantity <= 5)
        return 'low_stock';
    return 'in_stock';
};
class InventoryRepository {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }
    list() {
        return this.items;
    }
    findById(id) {
        return this.items.find((item) => item.id === id) ?? null;
    }
    create(payload) {
        const item = {
            id: this.nextId++,
            name: payload.name,
            sku: payload.sku,
            quantity: payload.quantity,
            unitPrice: payload.unitPrice,
            status: toStatus(payload.quantity, payload.status),
            updatedAt: new Date().toISOString(),
            ...(payload.details !== undefined ? { details: payload.details } : {}),
        };
        this.items.push(item);
        return item;
    }
    update(id, payload) {
        const item = this.findById(id);
        if (!item)
            return null;
        if (payload.name !== undefined)
            item.name = payload.name;
        if (payload.sku !== undefined)
            item.sku = payload.sku;
        if (payload.quantity !== undefined)
            item.quantity = payload.quantity;
        if (payload.unitPrice !== undefined)
            item.unitPrice = payload.unitPrice;
        if (payload.details !== undefined)
            item.details = payload.details;
        item.status = toStatus(item.quantity, payload.status ?? item.status);
        item.updatedAt = new Date().toISOString();
        return item;
    }
    remove(id) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index < 0)
            return false;
        this.items.splice(index, 1);
        return true;
    }
}
exports.inventoryRepository = new InventoryRepository();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRepository = void 0;
class LogRepository {
    constructor() {
        this.logs = [];
        this.nextId = 1;
    }
    list() {
        return this.logs;
    }
    findById(id) {
        return this.logs.find((log) => log.id === id) ?? null;
    }
    create(payload) {
        const entry = {
            id: this.nextId++,
            inventoryItemId: payload.inventoryItemId,
            action: payload.action,
            quantity: payload.quantity,
            createdAt: new Date().toISOString(),
            ...(payload.note !== undefined ? { note: payload.note } : {}),
        };
        this.logs.unshift(entry);
        return entry;
    }
    update(id, payload) {
        const entry = this.findById(id);
        if (!entry)
            return null;
        if (payload.action !== undefined)
            entry.action = payload.action;
        if (payload.quantity !== undefined)
            entry.quantity = payload.quantity;
        if (payload.note !== undefined)
            entry.note = payload.note;
        return entry;
    }
    remove(id) {
        const index = this.logs.findIndex((log) => log.id === id);
        if (index < 0)
            return false;
        this.logs.splice(index, 1);
        return true;
    }
}
exports.logRepository = new LogRepository();

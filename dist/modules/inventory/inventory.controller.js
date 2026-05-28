"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryController = void 0;
const inventory_service_js_1 = require("./inventory.service.js");
const parseId = (id) => {
    if (typeof id !== 'string')
        return Number.NaN;
    return Number.parseInt(id, 10);
};
class InventoryController {
    constructor() {
        this.list = (_req, res) => {
            res.status(200).json(inventory_service_js_1.inventoryService.list());
        };
        this.getById = (req, res) => {
            const item = inventory_service_js_1.inventoryService.getById(parseId(req.params.id));
            if (!item) {
                res.status(404).json({ message: 'Inventory item not found' });
                return;
            }
            res.status(200).json(item);
        };
        this.create = (req, res) => {
            res.status(201).json(inventory_service_js_1.inventoryService.create(req.body));
        };
        this.update = (req, res) => {
            const updated = inventory_service_js_1.inventoryService.update(parseId(req.params.id), req.body);
            if (!updated) {
                res.status(404).json({ message: 'Inventory item not found' });
                return;
            }
            res.status(200).json(updated);
        };
        this.remove = (req, res) => {
            const removed = inventory_service_js_1.inventoryService.remove(parseId(req.params.id));
            if (!removed) {
                res.status(404).json({ message: 'Inventory item not found' });
                return;
            }
            res.status(204).send();
        };
    }
}
exports.inventoryController = new InventoryController();

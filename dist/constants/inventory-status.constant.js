"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryActionType = exports.InventoryStatus = void 0;
var InventoryStatus;
(function (InventoryStatus) {
    InventoryStatus["IN_STOCK"] = "IN_STOCK";
    InventoryStatus["LOW_STOCK"] = "LOW_STOCK";
    InventoryStatus["OUT_OF_STOCK"] = "OUT_OF_STOCK";
    InventoryStatus["RESERVED"] = "RESERVED";
})(InventoryStatus || (exports.InventoryStatus = InventoryStatus = {}));
var InventoryActionType;
(function (InventoryActionType) {
    InventoryActionType["STOCK_IN"] = "stock_in";
    InventoryActionType["STOCK_OUT"] = "stock_out";
    InventoryActionType["ADJUSTMENT"] = "adjustment";
    InventoryActionType["DAMAGED"] = "damaged";
    InventoryActionType["RETURNED"] = "returned";
})(InventoryActionType || (exports.InventoryActionType = InventoryActionType = {}));

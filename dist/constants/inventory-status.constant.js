export var InventoryStatus;
(function (InventoryStatus) {
    InventoryStatus["IN_STOCK"] = "IN_STOCK";
    InventoryStatus["LOW_STOCK"] = "LOW_STOCK";
    InventoryStatus["OUT_OF_STOCK"] = "OUT_OF_STOCK";
    InventoryStatus["RESERVED"] = "RESERVED";
})(InventoryStatus || (InventoryStatus = {}));
export var InventoryActionType;
(function (InventoryActionType) {
    InventoryActionType["STOCK_IN"] = "stock_in";
    InventoryActionType["STOCK_OUT"] = "stock_out";
    InventoryActionType["ADJUSTMENT"] = "adjustment";
    InventoryActionType["DAMAGED"] = "damaged";
    InventoryActionType["RETURNED"] = "returned";
})(InventoryActionType || (InventoryActionType = {}));

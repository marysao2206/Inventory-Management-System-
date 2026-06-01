var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
let InventoryItem = class InventoryItem {
};
__decorate([
    PrimaryGeneratedColumn({ type: "bigint" }),
    __metadata("design:type", String)
], InventoryItem.prototype, "id", void 0);
__decorate([
    Column({ name: "product_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], InventoryItem.prototype, "productId", void 0);
__decorate([
    Column({ name: "warehouse_location", type: "varchar", length: 150, nullable: true }),
    __metadata("design:type", Object)
], InventoryItem.prototype, "warehouseLocation", void 0);
__decorate([
    Column({ type: "int", nullable: true }),
    __metadata("design:type", Object)
], InventoryItem.prototype, "quantity", void 0);
__decorate([
    Column({ type: "enum", enum: ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK", "RESERVED"], nullable: true }),
    __metadata("design:type", Object)
], InventoryItem.prototype, "status", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at", type: "timestamp" }),
    __metadata("design:type", Date)
], InventoryItem.prototype, "updatedAt", void 0);
InventoryItem = __decorate([
    Entity("inventory_items")
], InventoryItem);
export { InventoryItem };
let InventoryLog = class InventoryLog {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], InventoryLog.prototype, "id", void 0);
__decorate([
    Column({ name: "inventory_item_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], InventoryLog.prototype, "inventoryItemId", void 0);
__decorate([
    Column({ name: "action_type", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], InventoryLog.prototype, "actionType", void 0);
__decorate([
    Column({ type: "int", nullable: true }),
    __metadata("design:type", Object)
], InventoryLog.prototype, "quantity", void 0);
__decorate([
    Column({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], InventoryLog.prototype, "note", void 0);
__decorate([
    Column({ name: "created_by", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], InventoryLog.prototype, "createdBy", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], InventoryLog.prototype, "createdAt", void 0);
InventoryLog = __decorate([
    Entity("inventory_logs")
], InventoryLog);
export { InventoryLog };
let InventoryDetail = class InventoryDetail {
};
__decorate([
    PrimaryGeneratedColumn({ type: "bigint" }),
    __metadata("design:type", String)
], InventoryDetail.prototype, "id", void 0);
__decorate([
    Column({ name: "inventory_item_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], InventoryDetail.prototype, "inventoryItemId", void 0);
__decorate([
    Column({ name: "product_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], InventoryDetail.prototype, "productId", void 0);
__decorate([
    Column({ name: "user_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], InventoryDetail.prototype, "userId", void 0);
InventoryDetail = __decorate([
    Entity("inventory_details")
], InventoryDetail);
export { InventoryDetail };
let Stock = class Stock {
};
__decorate([
    PrimaryGeneratedColumn({ type: "bigint" }),
    __metadata("design:type", String)
], Stock.prototype, "id", void 0);
__decorate([
    Column({ name: "detail_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], Stock.prototype, "detailId", void 0);
__decorate([
    Column({ name: "supply_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], Stock.prototype, "supplyId", void 0);
__decorate([
    Column({ type: "float", nullable: true }),
    __metadata("design:type", Object)
], Stock.prototype, "qty", void 0);
__decorate([
    Column({ name: "unit_price", type: "float", nullable: true }),
    __metadata("design:type", Object)
], Stock.prototype, "unitPrice", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Stock.prototype, "createdAt", void 0);
__decorate([
    Column({ name: "user_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], Stock.prototype, "userId", void 0);
Stock = __decorate([
    Entity("stocks")
], Stock);
export { Stock };

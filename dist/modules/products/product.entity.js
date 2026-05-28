var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
let Product = class Product {
};
__decorate([
    PrimaryGeneratedColumn({ type: "bigint" }),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    Column({ name: "category_id", type: "bigint" }),
    __metadata("design:type", String)
], Product.prototype, "categoryId", void 0);
__decorate([
    Column({ name: "supplier_id", type: "bigint" }),
    __metadata("design:type", String)
], Product.prototype, "supplierId", void 0);
__decorate([
    Column({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Column({ type: "varchar", length: 150, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    Column({ type: "varchar", length: 150, unique: true, nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "barcode", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    Column({ name: "image_url", type: "text", nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "imageUrl", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
Product = __decorate([
    Entity("products")
], Product);
export { Product };

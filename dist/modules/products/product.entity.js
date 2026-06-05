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
import { ManyToOne, JoinColumn } from "typeorm";
import { Category } from "../categories/category.entity.js";
import { Supplier } from "../suppliers/supplier.entity.js";
let Product = class Product {
};
__decorate([
    PrimaryGeneratedColumn({ type: "bigint" }),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Category),
    JoinColumn({ name: "category_id" }),
    __metadata("design:type", Category)
], Product.prototype, "category", void 0);
__decorate([
    ManyToOne(() => Supplier),
    JoinColumn({ name: "supplier_id" }),
    __metadata("design:type", Supplier)
], Product.prototype, "supplier", void 0);
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
__decorate([
    Column({ name: "created_by", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "createdBy", void 0);
Product = __decorate([
    Entity("products")
], Product);
export { Product };

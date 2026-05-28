<<<<<<< HEAD
"use strict";
=======
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
let Payment = class Payment {
};
__decorate([
    PrimaryGeneratedColumn({ type: "bigint" }),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    Column({ name: "order_id", type: "bigint" }),
    __metadata("design:type", String)
], Payment.prototype, "orderId", void 0);
__decorate([
    Column({ name: "transaction_id", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], Payment.prototype, "transactionId", void 0);
__decorate([
    Column({ name: "khqr_token", type: "text", nullable: true }),
    __metadata("design:type", Object)
], Payment.prototype, "khqrToken", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", String)
], Payment.prototype, "amount", void 0);
__decorate([
    Column({ name: "payment_method", type: "varchar", length: 50, default: "KHQR" }),
    __metadata("design:type", String)
], Payment.prototype, "paymentMethod", void 0);
__decorate([
    Column({ type: "varchar", length: 30, default: "PENDING" }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    Column({ name: "paid_at", type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], Payment.prototype, "paidAt", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Payment.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at", type: "timestamp" }),
    __metadata("design:type", Date)
], Payment.prototype, "updatedAt", void 0);
Payment = __decorate([
    Entity("payments")
], Payment);
export { Payment };
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b

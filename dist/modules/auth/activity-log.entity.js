var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity.js";
let ActivityLog = class ActivityLog {
};
__decorate([
    PrimaryGeneratedColumn({ type: "bigint" }),
    __metadata("design:type", String)
], ActivityLog.prototype, "id", void 0);
__decorate([
    Column({ name: "user_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "userId", void 0);
__decorate([
    Column({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "activity", void 0);
__decorate([
    Column({ name: "ip_address", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "ipAddress", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], ActivityLog.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.activityLogs),
    JoinColumn({ name: "user_id" }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "user", void 0);
ActivityLog = __decorate([
    Entity("activity_logs")
], ActivityLog);
export { ActivityLog };

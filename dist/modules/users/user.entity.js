var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../auth/auth.entity.js";
import { ActivityLog } from "../auth/activity-log.entity.js";
let User = class User {
};
__decorate([
    PrimaryGeneratedColumn({ type: "bigint" }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({ name: "role_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "roleId", void 0);
__decorate([
    Column({ name: "full_name", type: "varchar", length: 150, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    Column({ type: "varchar", length: 150, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ type: "varchar", length: 20, unique: true, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "phone", void 0);
__decorate([
    Column({ type: "boolean", nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    Column({ name: "email_verified", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    Column({ name: "email_verification_code_hash", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "emailVerificationCodeHash", void 0);
__decorate([
    Column({ name: "email_verification_expires_at", type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "emailVerificationExpiresAt", void 0);
__decorate([
    Column({ name: "email_verified_at", type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "emailVerifiedAt", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => Role, (role) => role.users, { eager: true }),
    JoinColumn({ name: "role_id" }),
    __metadata("design:type", Role)
], User.prototype, "role", void 0);
__decorate([
    OneToMany(() => ActivityLog, (activityLog) => activityLog.user),
    __metadata("design:type", Array)
], User.prototype, "activityLogs", void 0);
User = __decorate([
    Entity("users")
], User);
export { User };

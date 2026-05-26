"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        roleId: zod_1.z.string(),
        fullName: zod_1.z.string().min(2).max(150),
        email: zod_1.z.string().email().max(150),
        password: zod_1.z.string().min(8).max(255),
        phone: zod_1.z.string().max(20).optional(),
        status: zod_1.z.boolean().optional()
    })
});
exports.updateUserSchema = zod_1.z.object({
    body: exports.createUserSchema.shape.body.partial().omit({ password: true }).extend({
        password: zod_1.z.string().min(8).max(255).optional()
    })
});

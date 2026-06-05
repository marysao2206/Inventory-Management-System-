import { z } from "zod";
export const createUserSchema = z.object({
    body: z.object({
        roleId: z.string(),
        fullName: z.string().min(2).max(150),
        email: z.string().email().max(150),
        password: z.string().min(8).max(255),
        phone: z.string().max(20).optional(),
        status: z.boolean().optional()
    })
});
export const updateUserSchema = z.object({
    body: createUserSchema.shape.body.partial().omit({ password: true }).extend({
        password: z.string().min(8).max(255).optional()
    })
});

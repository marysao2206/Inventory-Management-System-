<<<<<<< HEAD
"use strict";
=======
import { z } from "zod";
export const createOrderSchema = z.object({
    body: z.object({
        userId: z.string().optional(),
        totalAmount: z.number().positive(),
        status: z.string().max(30).optional()
    })
});
export const updateOrderSchema = z.object({
    body: createOrderSchema.shape.body.partial()
});
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b

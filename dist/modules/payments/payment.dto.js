<<<<<<< HEAD
"use strict";
=======
import { z } from "zod";
export const createPaymentSchema = z.object({
    body: z.object({
        orderId: z.string(),
        transactionId: z.string().max(255).optional(),
        khqrToken: z.string().optional(),
        amount: z.number().positive(),
        paymentMethod: z.string().max(50).optional(),
        status: z.string().max(30).optional(),
        paidAt: z.coerce.date().optional()
    })
});
export const updatePaymentSchema = z.object({
    body: createPaymentSchema.shape.body.partial()
});
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b

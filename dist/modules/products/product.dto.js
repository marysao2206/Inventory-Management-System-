import { z } from "zod";
export const createProductSchema = z.object({
    body: z.object({
        categoryId: z.string(),
        supplierId: z.string(),
        name: z.string().min(2).max(150),
        sku: z.string().min(1).max(150),
        barcode: z.string().max(150).optional(),
        price: z.number().positive(),
        imageUrl: z.string().url().optional()
    })
});
export const updateProductSchema = z.object({
    body: createProductSchema.shape.body.partial()
});

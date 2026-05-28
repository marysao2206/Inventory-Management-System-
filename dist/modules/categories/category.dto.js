import { z } from "zod";
export const createCategorySchema = z.object({
    body: z.object({
        name: z.string().min(2).max(150),
        description: z.string().max(1000).optional()
    })
});
export const updateCategorySchema = z.object({
    body: createCategorySchema.shape.body.partial()
});

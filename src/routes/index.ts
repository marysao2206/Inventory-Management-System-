import { Router } from "express";
import { categoryRoutes } from "../modules/categories/category.routes";
import { inventoryRoutes } from "../modules/inventory/inventory.routes";
import { productRoutes } from "../modules/products/product.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "OK"
  });
});

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/inventory", inventoryRoutes);

export const routes = router;

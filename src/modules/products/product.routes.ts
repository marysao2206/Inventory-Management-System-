import { Router } from "express";
import { productController } from "./product.controller";

const router = Router();

router.get("/", productController.findAll);
router.get("/:id", productController.findById);
router.post("/", productController.create);
router.patch("/:id", productController.update);
router.delete("/:id", productController.remove);

export const productRoutes = router;

import { Router } from "express";
import { inventoryController } from "./inventory.controller";

const router = Router();

router.get("/", inventoryController.findAll);
router.get("/:id", inventoryController.findById);
router.post("/", inventoryController.create);
router.patch("/:id", inventoryController.update);
router.delete("/:id", inventoryController.remove);

export const inventoryRoutes = router;

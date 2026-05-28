import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findById);
router.post("/", categoryController.create);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.remove);

export const categoryRoutes = router;

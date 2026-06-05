import { Router } from "express";
import { Permission } from "../../constants/roles.constant.js";
import { authMiddleware } from "../../core/middlewares/auth.middleware.js";
import { permissionMiddleware } from "../../core/middlewares/rbac.middleware.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { inventoryController } from "./inventory.controller.js";

const inventoryRouter = Router();

inventoryRouter.use(authMiddleware);
inventoryRouter.get("/items", permissionMiddleware(Permission.INVENTORY_READ), asyncHandler(inventoryController.listItems));
inventoryRouter.get("/items/:id", permissionMiddleware(Permission.INVENTORY_READ), asyncHandler(inventoryController.getItemById));
inventoryRouter.post("/items", permissionMiddleware(Permission.INVENTORY_CREATE), asyncHandler(inventoryController.createItem));
inventoryRouter.patch("/items/:id", permissionMiddleware(Permission.INVENTORY_UPDATE), asyncHandler(inventoryController.updateItem));
inventoryRouter.delete("/items/:id", permissionMiddleware(Permission.INVENTORY_DELETE), asyncHandler(inventoryController.removeItem));
inventoryRouter.get("/logs", permissionMiddleware(Permission.INVENTORY_READ), asyncHandler(inventoryController.listLogs));
inventoryRouter.get("/stocks", permissionMiddleware(Permission.INVENTORY_READ), asyncHandler(inventoryController.listStocks));
inventoryRouter.post("/stocks", permissionMiddleware(Permission.INVENTORY_CREATE), asyncHandler(inventoryController.receiveStock));

export default inventoryRouter;

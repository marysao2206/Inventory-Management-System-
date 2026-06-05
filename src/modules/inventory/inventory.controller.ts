import type { Request, Response } from "express";
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { NotFoundError } from "../../core/errors/not-found-error.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { inventoryService } from "./inventory.service.js";

class InventoryController {
  listItems = async (_req: Request, res: Response) => {
    return apiResponse(res, 200, ResponseMessage.FETCHED, await inventoryService.listItems());
  };

  getItemById = async (req: Request, res: Response) => {
    const item = await inventoryService.getItemById(req.params.id);
    if (!item) throw new NotFoundError("Inventory item not found");
    return apiResponse(res, 200, ResponseMessage.FETCHED, item);
  };

  createItem = async (req: Request, res: Response) => {
    return apiResponse(res, 201, ResponseMessage.CREATED, await inventoryService.createItem(req.body, req.user?.id));
  };

  updateItem = async (req: Request, res: Response) => {
    const updated = await inventoryService.updateItem(req.params.id, req.body, req.user?.id);
    if (!updated) throw new NotFoundError("Inventory item not found");
    return apiResponse(res, 200, ResponseMessage.UPDATED, updated);
  };

  removeItem = async (req: Request, res: Response) => {
    const removed = await inventoryService.removeItem(req.params.id, req.user?.id);
    if (!removed) throw new NotFoundError("Inventory item not found");
    return apiResponse(res, 200, ResponseMessage.DELETED);
  };

  listLogs = async (_req: Request, res: Response) => {
    return apiResponse(res, 200, ResponseMessage.FETCHED, await inventoryService.listLogs());
  };

  listStocks = async (_req: Request, res: Response) => {
    return apiResponse(res, 200, ResponseMessage.FETCHED, await inventoryService.listStocks());
  };

  receiveStock = async (req: Request, res: Response) => {
    return apiResponse(res, 201, ResponseMessage.CREATED, await inventoryService.receiveStock(req.body, req.user?.id));
  };
}

export const inventoryController = new InventoryController();

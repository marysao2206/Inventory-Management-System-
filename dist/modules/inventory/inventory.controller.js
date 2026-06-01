import { ResponseMessage } from "../../constants/response-message.constant.js";
import { NotFoundError } from "../../core/errors/not-found-error.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { inventoryService } from "./inventory.service.js";
class InventoryController {
    constructor() {
        this.listItems = async (_req, res) => {
            return apiResponse(res, 200, ResponseMessage.FETCHED, await inventoryService.listItems());
        };
        this.getItemById = async (req, res) => {
            const item = await inventoryService.getItemById(req.params.id);
            if (!item)
                throw new NotFoundError("Inventory item not found");
            return apiResponse(res, 200, ResponseMessage.FETCHED, item);
        };
        this.createItem = async (req, res) => {
            return apiResponse(res, 201, ResponseMessage.CREATED, await inventoryService.createItem(req.body, req.user?.id));
        };
        this.updateItem = async (req, res) => {
            const updated = await inventoryService.updateItem(req.params.id, req.body, req.user?.id);
            if (!updated)
                throw new NotFoundError("Inventory item not found");
            return apiResponse(res, 200, ResponseMessage.UPDATED, updated);
        };
        this.removeItem = async (req, res) => {
            const removed = await inventoryService.removeItem(req.params.id, req.user?.id);
            if (!removed)
                throw new NotFoundError("Inventory item not found");
            return apiResponse(res, 200, ResponseMessage.DELETED);
        };
        this.listLogs = async (_req, res) => {
            return apiResponse(res, 200, ResponseMessage.FETCHED, await inventoryService.listLogs());
        };
        this.listStocks = async (_req, res) => {
            return apiResponse(res, 200, ResponseMessage.FETCHED, await inventoryService.listStocks());
        };
        this.receiveStock = async (req, res) => {
            return apiResponse(res, 201, ResponseMessage.CREATED, await inventoryService.receiveStock(req.body, req.user?.id));
        };
    }
}
export const inventoryController = new InventoryController();

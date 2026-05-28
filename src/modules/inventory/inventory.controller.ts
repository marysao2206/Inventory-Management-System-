import { Request, Response } from "express";
import { ResponseMessage } from "../../constants/response-message.constant";
import { apiResponse } from "../../core/utils/api-response";
import {getPagination,paginationMeta,} from "../../core/utils/pagination";
import { inventoryService } from "./inventory.service";

const parseString = (
  value: unknown,
  fallback = ""
): string =>
  typeof value === "string"
    ? value
    : fallback;

export class InventoryController {
  async findAll(req: Request, res: Response) {
    const pagination = getPagination(req);

    const search = parseString(
      req.query.search,
      undefined as unknown as string
    );

    const { data, total } =
      await inventoryService.findAll(
        pagination,
        search
      );

    return apiResponse(
      res,
      200,
      ResponseMessage.FETCHED,
      data,
      paginationMeta(
        total,
        pagination.page,
        pagination.limit
      )
    );
  }

  async findById(req: Request, res: Response) {
    const id = parseString(req.params.id);

    const inventory =
      await inventoryService.findById(id);

    return apiResponse(
      res,
      200,
      ResponseMessage.FETCHED,
      inventory
    );
  }

  async create(req: Request, res: Response) {
    const inventory =
      await inventoryService.create(req.body);

    return apiResponse(
      res,
      201,
      ResponseMessage.CREATED,
      inventory
    );
  }

  async update(req: Request, res: Response) {
    const id = parseString(req.params.id);

    const inventory =
      await inventoryService.update(
        id,
        req.body
      );

    return apiResponse(
      res,
      200,
      ResponseMessage.UPDATED,
      inventory
    );
  }

  async remove(req: Request, res: Response) {
    const id = parseString(req.params.id);

    await inventoryService.remove(id);

    return apiResponse(
      res,
      200,
      ResponseMessage.DELETED
    );
  }
}

export const inventoryController =
  new InventoryController();
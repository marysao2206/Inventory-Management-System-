import { Request, Response } from "express";
import { ResponseMessage } from "../../constants/response-message.constant";
import { apiResponse } from "../../core/utils/api-response";
import {getPagination,paginationMeta,} from "../../core/utils/pagination";
import { categoryService } from "./category.service";

const parseString = (
  value: unknown,
  fallback = ""
): string =>
  typeof value === "string"
    ? value
    : fallback;

export class CategoryController {
  async findAll(req: Request, res: Response) {
    const pagination = getPagination(req);

    const search = parseString(
      req.query.search,
      undefined as unknown as string
    );

    const { data, total } =
      await categoryService.findAll(
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

    const category =
      await categoryService.findById(id);

    return apiResponse(
      res,
      200,
      ResponseMessage.FETCHED,
      category
    );
  }

  async create(req: Request, res: Response) {
    const category =
      await categoryService.create(req.body);

    return apiResponse(
      res,
      201,
      ResponseMessage.CREATED,
      category
    );
  }

  async update(req: Request, res: Response) {
    const id = parseString(req.params.id);

    const category =
      await categoryService.update(
        id,
        req.body
      );

    return apiResponse(
      res,
      200,
      ResponseMessage.UPDATED,
      category
    );
  }

  async remove(req: Request, res: Response) {
    const id = parseString(req.params.id);

    await categoryService.remove(id);

    return apiResponse(
      res,
      200,
      ResponseMessage.DELETED
    );
  }
}

export const categoryController =
  new CategoryController();
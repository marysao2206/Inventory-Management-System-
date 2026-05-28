import { Request, Response } from "express";

import { ResponseMessage } from "../../constants/response-message.constant";
import { apiResponse } from "../../core/utils/api-response";
import { getPagination, paginationMeta } from "../../core/utils/pagination";
import { productService } from "./product.service";

const parseString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

export class ProductController {
  async findAll(req: Request, res: Response) {
    const pagination = getPagination(req);
    const search = parseString(req.query.search, undefined as unknown as string);

    const { data, total } = await productService.findAll(
      pagination,
      search
    );

    return apiResponse(
      res,
      200,
      ResponseMessage.FETCHED,
      data,
      paginationMeta(total, pagination.page, pagination.limit)
    );
  }

  async findById(req: Request, res: Response) {
    const id = parseString(req.params.id);

    const product = await productService.findById(id);

    return apiResponse(
      res,
      200,
      ResponseMessage.FETCHED,
      product
    );
  }

  async create(req: Request, res: Response) {
    const product = await productService.create(req.body);

    return apiResponse(
      res,
      201,
      ResponseMessage.CREATED,
      product
    );
  }

  async update(req: Request, res: Response) {
    const id = parseString(req.params.id);

    const product = await productService.update(id, req.body);

    return apiResponse(
      res,
      200,
      ResponseMessage.UPDATED,
      product
    );
  }

  async remove(req: Request, res: Response) {
    const id = parseString(req.params.id);

    await productService.remove(id);

    return apiResponse(
      res,
      200,
      ResponseMessage.DELETED
    );
  }
}

export const productController = new ProductController();
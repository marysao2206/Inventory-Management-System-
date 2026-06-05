import { Request, Response } from "express";
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { getPagination, paginationMeta } from "../../core/utils/pagination.js";
import { productService } from "./product.service.js";

export class ProductController {
  findAll = async (req: Request, res: Response) => {
    const pagination = getPagination(req);
    const { data, total } = await productService.findAll(pagination);
    return apiResponse(res, 200, ResponseMessage.FETCHED, data, paginationMeta(total, pagination.page, pagination.limit));
  };

  findById = async (req: Request, res: Response) => {
    return apiResponse(res, 200, ResponseMessage.FETCHED, await productService.findById(req.params.id));
  };

  create = async (req: Request, res: Response) => {
    return apiResponse(res, 201, ResponseMessage.CREATED, await productService.create(req.body, req.user?.id));
  };

  update = async (req: Request, res: Response) => {
    return apiResponse(res, 200, ResponseMessage.UPDATED, await productService.update(req.params.id, req.body));
  };

  remove = async (req: Request, res: Response) => {
    await productService.remove(req.params.id);
    return apiResponse(res, 200, ResponseMessage.DELETED);
  };
}

export const productController = new ProductController();
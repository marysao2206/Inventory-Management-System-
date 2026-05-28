import { Request, Response } from "express";
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { getPagination, paginationMeta } from "../../core/utils/pagination.js";
import { categoryService } from "./category.service.js";

export class CategoryController {
  findAll = async (req: Request, res: Response) => {
    const pagination = getPagination(req);
    const { data, total } = await categoryService.findAll(pagination);
    return apiResponse(res, 200, ResponseMessage.FETCHED, data, paginationMeta(total, pagination.page, pagination.limit));
  };

  findById = async (req: Request, res: Response) => {
    return apiResponse(res, 200, ResponseMessage.FETCHED, await categoryService.findById(req.params.id));
  };

  create = async (req: Request, res: Response) => {
    return apiResponse(res, 201, ResponseMessage.CREATED, await categoryService.create(req.body));
  };

  update = async (req: Request, res: Response) => {
    return apiResponse(res, 200, ResponseMessage.UPDATED, await categoryService.update(req.params.id, req.body));
  };

  remove = async (req: Request, res: Response) => {
    await categoryService.remove(req.params.id);
    return apiResponse(res, 200, ResponseMessage.DELETED);
  };
}

export const categoryController = new CategoryController();
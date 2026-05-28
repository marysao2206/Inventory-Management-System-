<<<<<<< HEAD
"use strict";
=======
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { getPagination, paginationMeta } from "../../core/utils/pagination.js";
import { orderService } from "./order.service.js";
export class OrderController {
    constructor() {
        this.findAll = async (req, res) => {
            const pagination = getPagination(req);
            const { data, total } = await orderService.findAll(pagination);
            return apiResponse(res, 200, ResponseMessage.FETCHED, data, paginationMeta(total, pagination.page, pagination.limit));
        };
        this.findById = async (req, res) => {
            return apiResponse(res, 200, ResponseMessage.FETCHED, await orderService.findById(req.params.id));
        };
        this.create = async (req, res) => {
            return apiResponse(res, 201, ResponseMessage.CREATED, await orderService.create(req.body));
        };
        this.update = async (req, res) => {
            return apiResponse(res, 200, ResponseMessage.UPDATED, await orderService.update(req.params.id, req.body));
        };
        this.remove = async (req, res) => {
            await orderService.remove(req.params.id);
            return apiResponse(res, 200, ResponseMessage.DELETED);
        };
    }
}
export const orderController = new OrderController();
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b

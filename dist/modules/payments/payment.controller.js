<<<<<<< HEAD
"use strict";
=======
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { getPagination, paginationMeta } from "../../core/utils/pagination.js";
import { paymentService } from "./payment.service.js";
export class PaymentController {
    constructor() {
        this.findAll = async (req, res) => {
            const pagination = getPagination(req);
            const { data, total } = await paymentService.findAll(pagination);
            return apiResponse(res, 200, ResponseMessage.FETCHED, data, paginationMeta(total, pagination.page, pagination.limit));
        };
        this.findById = async (req, res) => {
            return apiResponse(res, 200, ResponseMessage.FETCHED, await paymentService.findById(req.params.id));
        };
        this.create = async (req, res) => {
            return apiResponse(res, 201, ResponseMessage.CREATED, await paymentService.create(req.body));
        };
        this.update = async (req, res) => {
            return apiResponse(res, 200, ResponseMessage.UPDATED, await paymentService.update(req.params.id, req.body));
        };
        this.remove = async (req, res) => {
            await paymentService.remove(req.params.id);
            return apiResponse(res, 200, ResponseMessage.DELETED);
        };
    }
}
export const paymentController = new PaymentController();
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b

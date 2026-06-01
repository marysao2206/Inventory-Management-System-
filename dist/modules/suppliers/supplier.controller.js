import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { getPagination, paginationMeta } from "../../core/utils/pagination.js";
import { supplierService } from "./supplier.service.js";
export class SupplierController {
    constructor() {
        this.findAll = async (req, res) => {
            const pagination = getPagination(req);
            const { data, total } = await supplierService.findAll(pagination);
            return apiResponse(res, 200, ResponseMessage.FETCHED, data, paginationMeta(total, pagination.page, pagination.limit));
        };
        this.findById = async (req, res) => {
            return apiResponse(res, 200, ResponseMessage.FETCHED, await supplierService.findById(req.params.id));
        };
        this.create = async (req, res) => {
            return apiResponse(res, 201, ResponseMessage.CREATED, await supplierService.create(req.body));
        };
        this.update = async (req, res) => {
            return apiResponse(res, 200, ResponseMessage.UPDATED, await supplierService.update(req.params.id, req.body));
        };
        this.remove = async (req, res) => {
            await supplierService.remove(req.params.id);
            return apiResponse(res, 200, ResponseMessage.DELETED);
        };
    }
}
export const supplierController = new SupplierController();

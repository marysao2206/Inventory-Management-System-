import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { getPagination, paginationMeta } from "../../core/utils/pagination.js";
import { userService } from "./user.service.js";
export class UserController {
    constructor() {
        this.findAll = async (req, res) => {
            const pagination = getPagination(req);
            const { data, total } = await userService.findAll(pagination);
            return apiResponse(res, 200, ResponseMessage.FETCHED, data, paginationMeta(total, pagination.page, pagination.limit));
        };
        this.findById = async (req, res) => {
            return apiResponse(res, 200, ResponseMessage.FETCHED, await userService.findById(req.params.id));
        };
        this.create = async (req, res) => {
            return apiResponse(res, 201, ResponseMessage.CREATED, await userService.create(req.body));
        };
        this.update = async (req, res) => {
            return apiResponse(res, 200, ResponseMessage.UPDATED, await userService.update(req.params.id, req.body));
        };
        this.remove = async (req, res) => {
            await userService.remove(req.params.id);
            return apiResponse(res, 200, ResponseMessage.DELETED);
        };
    }
}
export const userController = new UserController();

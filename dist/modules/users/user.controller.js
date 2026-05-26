"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const response_message_constant_1 = require("../../constants/response-message.constant");
const api_response_1 = require("../../core/utils/api-response");
const pagination_1 = require("../../core/utils/pagination");
const user_service_1 = require("./user.service");
class UserController {
    constructor() {
        this.findAll = async (req, res) => {
            const pagination = (0, pagination_1.getPagination)(req);
            const { data, total } = await user_service_1.userService.findAll(pagination);
            return (0, api_response_1.apiResponse)(res, 200, response_message_constant_1.ResponseMessage.FETCHED, data, (0, pagination_1.paginationMeta)(total, pagination.page, pagination.limit));
        };
        this.findById = async (req, res) => {
            return (0, api_response_1.apiResponse)(res, 200, response_message_constant_1.ResponseMessage.FETCHED, await user_service_1.userService.findById(req.params.id));
        };
        this.create = async (req, res) => {
            return (0, api_response_1.apiResponse)(res, 201, response_message_constant_1.ResponseMessage.CREATED, await user_service_1.userService.create(req.body));
        };
        this.update = async (req, res) => {
            return (0, api_response_1.apiResponse)(res, 200, response_message_constant_1.ResponseMessage.UPDATED, await user_service_1.userService.update(req.params.id, req.body));
        };
        this.remove = async (req, res) => {
            await user_service_1.userService.remove(req.params.id);
            return (0, api_response_1.apiResponse)(res, 200, response_message_constant_1.ResponseMessage.DELETED);
        };
    }
}
exports.UserController = UserController;
exports.userController = new UserController();

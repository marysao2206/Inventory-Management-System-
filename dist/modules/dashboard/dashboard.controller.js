import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { dashboardService } from "./dashboard.service.js";
export class DashboardController {
    constructor() {
        this.getSummary = async (_req, res) => {
            return apiResponse(res, 200, ResponseMessage.FETCHED, await dashboardService.getSummary());
        };
    }
}
export const dashboardController = new DashboardController();

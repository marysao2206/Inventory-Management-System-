import { dashboardRepository } from "./dashboard.repository.js";
export class DashboardService {
    async getSummary() {
        return dashboardRepository.getSummary();
    }
}
export const dashboardService = new DashboardService();

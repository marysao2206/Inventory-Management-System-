import { AppDataSource } from "../../database/data-source.js";
import { ActivityLog } from "./activity-log.entity.js";
import { Role } from "./auth.entity.js";
import { User } from "../users/user.entity.js";
export const roleRepository = AppDataSource.getRepository(Role);
export const activityLogRepository = AppDataSource.getRepository(ActivityLog);
export const authUserRepository = AppDataSource.getRepository(User);

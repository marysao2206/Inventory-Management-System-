import { AppDataSource } from "../../database/data-source";
import { ActivityLog } from "./activity-log.entity";
import { Role } from "./auth.entity";
import { User } from "../users/user.entity";

export const roleRepository = AppDataSource.getRepository(Role);
export const activityLogRepository = AppDataSource.getRepository(ActivityLog);
export const authUserRepository = AppDataSource.getRepository(User);

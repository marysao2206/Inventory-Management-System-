import { AppDataSource } from "../../database/data-source.js";
import { User } from "./user.entity.js";

export const userRepository = AppDataSource.getRepository(User);

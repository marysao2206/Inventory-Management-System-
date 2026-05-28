import { env } from "./env.config";

export const appConfig = {
  port: env.app.port,
  apiPrefix: env.app.apiPrefix,
  name: "Inventory Management System"
};

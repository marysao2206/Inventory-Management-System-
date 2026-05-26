import "reflect-metadata";
import { env } from "./config/env.config";
import { AppDataSource } from "./database/data-source";
import { createApp } from "./app";

const start = async () => {
  await AppDataSource.initialize();

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`Inventory API running on port ${env.port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});

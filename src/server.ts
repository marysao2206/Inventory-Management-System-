import "reflect-metadata";
import { env } from "./config/env.config.js";
import { AppDataSource } from "./database/data-source.js";
import { createApp } from "./app.js";

const start = async () => {
  await AppDataSource.initialize();

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`Inventory API running on http://localhost:${env.port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});

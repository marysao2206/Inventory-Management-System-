import { app } from "./app";
import { appConfig } from "./config/app.config";
import AppDataSource from "./database/data-source";

const bootstrap = async () => {
  try {
    await AppDataSource.initialize();

    app.listen(appConfig.port, () => {
      console.log(`${appConfig.name} running on port ${appConfig.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

void bootstrap();

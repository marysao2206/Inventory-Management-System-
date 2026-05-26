"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const env_config_1 = require("./config/env.config");
const data_source_1 = require("./database/data-source");
const app_1 = require("./app");
const start = async () => {
    await data_source_1.AppDataSource.initialize();
    const app = (0, app_1.createApp)();
    app.listen(env_config_1.env.port, () => {
        console.log(`Inventory API running on port ${env_config_1.env.port}`);
    });
};
start().catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
});

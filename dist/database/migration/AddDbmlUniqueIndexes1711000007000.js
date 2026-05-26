"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDbmlUniqueIndexes1711000007000 = void 0;
class AddDbmlUniqueIndexes1711000007000 {
    constructor() {
        this.name = "AddDbmlUniqueIndexes1711000007000";
    }
    async up(queryRunner) {
        await this.addUniqueIndexIfMissing(queryRunner, "users", "users_phone_unique", "phone");
        await this.addUniqueIndexIfMissing(queryRunner, "suppliers", "suppliers_email_unique", "email");
    }
    async down(queryRunner) {
        await this.dropIndexIfExists(queryRunner, "suppliers", "suppliers_email_unique");
        await this.dropIndexIfExists(queryRunner, "users", "users_phone_unique");
    }
    async addUniqueIndexIfMissing(queryRunner, tableName, indexName, columnName) {
        const table = await queryRunner.getTable(tableName);
        if (!table?.indices.some((index) => index.name === indexName)) {
            await queryRunner.query(`ALTER TABLE ${tableName} ADD UNIQUE INDEX ${indexName} (${columnName})`);
        }
    }
    async dropIndexIfExists(queryRunner, tableName, indexName) {
        const table = await queryRunner.getTable(tableName);
        if (table?.indices.some((index) => index.name === indexName)) {
            await queryRunner.query(`ALTER TABLE ${tableName} DROP INDEX ${indexName}`);
        }
    }
}
exports.AddDbmlUniqueIndexes1711000007000 = AddDbmlUniqueIndexes1711000007000;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlignSchemaToDbml1711000006000 = void 0;
class AlignSchemaToDbml1711000006000 {
    constructor() {
        this.name = "AlignSchemaToDbml1711000006000";
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE users MODIFY role_id BIGINT NULL");
        await queryRunner.query("ALTER TABLE users MODIFY full_name VARCHAR(150) NULL");
        await queryRunner.query("ALTER TABLE users MODIFY email VARCHAR(150) NULL");
        await queryRunner.query("ALTER TABLE users MODIFY password VARCHAR(255) NULL");
        await queryRunner.query("ALTER TABLE users MODIFY status BOOLEAN NULL");
        await this.dropIndexIfExists(queryRunner, "categories", "name");
        if (await queryRunner.hasColumn("suppliers", "contact_person")) {
            await queryRunner.query("ALTER TABLE suppliers CHANGE contact_person contact_name VARCHAR(150) NULL");
        }
        await this.dropForeignKeyIfExists(queryRunner, "products", "fk_products_suppliers");
        if (await queryRunner.hasColumn("products", "supplier_id")) {
            await queryRunner.query("ALTER TABLE products DROP COLUMN supplier_id");
        }
        if (!(await queryRunner.hasColumn("products", "created_by"))) {
            await queryRunner.query("ALTER TABLE products ADD created_by BIGINT NULL AFTER image_url");
            await queryRunner.query("ALTER TABLE products ADD CONSTRAINT fk_users_id_products FOREIGN KEY (created_by) REFERENCES users(id)");
        }
        await queryRunner.query("ALTER TABLE products MODIFY category_id BIGINT NULL");
        await queryRunner.query("ALTER TABLE products MODIFY sku VARCHAR(150) NULL");
        await queryRunner.query("ALTER TABLE products MODIFY price DECIMAL(10,2) NULL");
        await this.dropIndexIfExists(queryRunner, "products", "sku");
        await this.addUniqueIndexIfMissing(queryRunner, "products", "products_sku_unique", "sku");
        await this.addIndexIfMissing(queryRunner, "products", "products_index_0", "category_id, created_by");
        await this.dropForeignKeyIfExists(queryRunner, "inventory_items", "fk_inventory_items_products");
        await queryRunner.query("ALTER TABLE inventory_items MODIFY product_id BIGINT NULL");
        await queryRunner.query("ALTER TABLE inventory_items MODIFY warehouse_location VARCHAR(150) NULL");
        await queryRunner.query("ALTER TABLE inventory_items MODIFY status VARCHAR(50) NULL");
        await queryRunner.query(`
      UPDATE inventory_items
      SET status = CASE status
        WHEN 'in_stock' THEN 'IN_STOCK'
        WHEN 'low_stock' THEN 'LOW_STOCK'
        WHEN 'out_of_stock' THEN 'OUT_OF_STOCK'
        WHEN 'damaged' THEN 'OUT_OF_STOCK'
        ELSE status
      END
    `);
        await queryRunner.query(`
      ALTER TABLE inventory_items
      MODIFY status ENUM('IN_STOCK','LOW_STOCK','OUT_OF_STOCK','RESERVED') NULL
    `);
        await queryRunner.query("ALTER TABLE inventory_items ADD CONSTRAINT fk_inventory_items_products FOREIGN KEY (product_id) REFERENCES products(id)");
    }
    async down(queryRunner) {
        await this.dropForeignKeyIfExists(queryRunner, "inventory_items", "fk_inventory_items_products");
        await queryRunner.query("ALTER TABLE inventory_items MODIFY status VARCHAR(50) NULL");
        await queryRunner.query(`
      UPDATE inventory_items
      SET status = CASE status
        WHEN 'IN_STOCK' THEN 'in_stock'
        WHEN 'LOW_STOCK' THEN 'low_stock'
        WHEN 'OUT_OF_STOCK' THEN 'out_of_stock'
        WHEN 'RESERVED' THEN 'out_of_stock'
        ELSE status
      END
    `);
        await queryRunner.query("ALTER TABLE inventory_items MODIFY status ENUM('in_stock','low_stock','out_of_stock','damaged') NOT NULL DEFAULT 'out_of_stock'");
        await queryRunner.query("ALTER TABLE inventory_items MODIFY warehouse_location VARCHAR(150) NOT NULL");
        await queryRunner.query("ALTER TABLE inventory_items MODIFY product_id BIGINT NOT NULL");
        await queryRunner.query("ALTER TABLE inventory_items ADD CONSTRAINT fk_inventory_items_products FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE");
        await this.dropIndexIfExists(queryRunner, "products", "products_index_0");
        await this.dropForeignKeyIfExists(queryRunner, "products", "fk_users_id_products");
        if (await queryRunner.hasColumn("products", "created_by")) {
            await queryRunner.query("ALTER TABLE products DROP COLUMN created_by");
        }
        if (!(await queryRunner.hasColumn("products", "supplier_id"))) {
            await queryRunner.query("ALTER TABLE products ADD supplier_id BIGINT NOT NULL AFTER category_id");
            await queryRunner.query("ALTER TABLE products ADD CONSTRAINT fk_products_suppliers FOREIGN KEY (supplier_id) REFERENCES suppliers(id)");
        }
        await queryRunner.query("ALTER TABLE products MODIFY category_id BIGINT NOT NULL");
        await queryRunner.query("ALTER TABLE products MODIFY sku VARCHAR(150) NOT NULL");
        await queryRunner.query("ALTER TABLE products MODIFY price DECIMAL(10,2) NOT NULL");
        if (await queryRunner.hasColumn("suppliers", "contact_name")) {
            await queryRunner.query("ALTER TABLE suppliers CHANGE contact_name contact_person VARCHAR(150) NULL");
        }
        await this.addUniqueIndexIfMissing(queryRunner, "categories", "name", "name");
        await queryRunner.query("ALTER TABLE users MODIFY status BOOLEAN NOT NULL DEFAULT TRUE");
        await queryRunner.query("ALTER TABLE users MODIFY password VARCHAR(255) NOT NULL");
        await queryRunner.query("ALTER TABLE users MODIFY email VARCHAR(150) NOT NULL");
        await queryRunner.query("ALTER TABLE users MODIFY full_name VARCHAR(150) NOT NULL");
        await queryRunner.query("ALTER TABLE users MODIFY role_id BIGINT NOT NULL");
    }
    async addIndexIfMissing(queryRunner, tableName, indexName, columns) {
        const table = await queryRunner.getTable(tableName);
        if (!table?.indices.some((index) => index.name === indexName)) {
            await queryRunner.query(`ALTER TABLE ${tableName} ADD INDEX ${indexName} (${columns})`);
        }
    }
    async addUniqueIndexIfMissing(queryRunner, tableName, indexName, columnName) {
        const table = await queryRunner.getTable(tableName);
        if (!table?.indices.some((index) => index.name === indexName)) {
            await queryRunner.query(`ALTER TABLE ${tableName} ADD UNIQUE INDEX ${indexName} (${columnName})`);
        }
    }
    async dropForeignKeyIfExists(queryRunner, tableName, foreignKeyName) {
        const table = await queryRunner.getTable(tableName);
        if (table?.foreignKeys.some((foreignKey) => foreignKey.name === foreignKeyName)) {
            await queryRunner.query(`ALTER TABLE ${tableName} DROP FOREIGN KEY ${foreignKeyName}`);
        }
    }
    async dropIndexIfExists(queryRunner, tableName, indexName) {
        const table = await queryRunner.getTable(tableName);
        if (table?.indices.some((index) => index.name === indexName)) {
            await queryRunner.query(`ALTER TABLE ${tableName} DROP INDEX ${indexName}`);
        }
    }
}
exports.AlignSchemaToDbml1711000006000 = AlignSchemaToDbml1711000006000;

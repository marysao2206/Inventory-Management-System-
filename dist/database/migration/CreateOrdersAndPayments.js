export class CreateOrdersAndPayments1711000005000 {
    constructor() {
        this.name = "CreateOrdersAndPayments1711000005000";
    }
    async up(queryRunner) {
        await this.addUniqueIndexIfMissing(queryRunner, "users", "users_email_unique", "email");
        await queryRunner.query("ALTER TABLE categories MODIFY name VARCHAR(150) NOT NULL");
        await queryRunner.query("ALTER TABLE suppliers MODIFY name VARCHAR(150) NOT NULL");
        await queryRunner.query("ALTER TABLE products MODIFY name VARCHAR(150) NOT NULL");
        await this.addUniqueIndexIfMissing(queryRunner, "products", "products_sku_unique", "sku");
        await queryRunner.query("ALTER TABLE inventory_items MODIFY quantity INT NOT NULL DEFAULT 0");
        if (!(await queryRunner.hasTable("inventory_details"))) {
            await queryRunner.query(`
        CREATE TABLE inventory_details (
          id BIGINT PRIMARY KEY AUTO_INCREMENT,
          inventory_item_id BIGINT NULL,
          product_id BIGINT NULL,
          user_id BIGINT NULL,
          INDEX inventory_details_index_0 (inventory_item_id, product_id, user_id),
          CONSTRAINT fk_products_id_inventory_details FOREIGN KEY (product_id) REFERENCES products(id),
          CONSTRAINT fk_inventory_items_id_inventory_details FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id),
          CONSTRAINT fk_users_id_inventory_details FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);
        }
        if (await queryRunner.hasTable("stocks")) {
            await queryRunner.query("ALTER TABLE stocks MODIFY id BIGINT NOT NULL AUTO_INCREMENT");
            await queryRunner.query("ALTER TABLE stocks MODIFY qty DECIMAL(10,2) NULL");
            await queryRunner.query("ALTER TABLE stocks MODIFY unit_price DECIMAL(10,2) NULL");
        }
        else {
            await queryRunner.query(`
        CREATE TABLE stocks (
          id BIGINT PRIMARY KEY AUTO_INCREMENT,
          detail_id BIGINT NULL,
          supply_id BIGINT NULL,
          qty DECIMAL(10,2) NULL,
          unit_price DECIMAL(10,2) NULL,
          user_id BIGINT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_inventory_details_id_stocks FOREIGN KEY (detail_id) REFERENCES inventory_details(id),
          CONSTRAINT fk_suppliers_id_stocks FOREIGN KEY (supply_id) REFERENCES suppliers(id),
          CONSTRAINT fk_users_id_stocks FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);
        }
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        user_id BIGINT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(150) NOT NULL DEFAULT 'PENDING',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        order_id BIGINT NOT NULL,
        transaction_id VARCHAR(150) NULL,
        khqr_token TEXT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(150) NOT NULL DEFAULT 'KHQR',
        status VARCHAR(150) NOT NULL DEFAULT 'PENDING',
        paid_at TIMESTAMP NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_payments_orders FOREIGN KEY (order_id) REFERENCES orders(id)
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE IF EXISTS payments");
        await queryRunner.query("DROP TABLE IF EXISTS orders");
        if (await queryRunner.hasTable("stocks")) {
            await queryRunner.query("ALTER TABLE stocks MODIFY unit_price FLOAT NULL");
            await queryRunner.query("ALTER TABLE stocks MODIFY qty FLOAT NULL");
            await queryRunner.query("ALTER TABLE stocks MODIFY id INT NOT NULL AUTO_INCREMENT");
        }
        await queryRunner.query("ALTER TABLE inventory_items MODIFY quantity INT NULL");
        await this.dropIndexIfExists(queryRunner, "products", "products_sku_unique");
        await queryRunner.query("ALTER TABLE products MODIFY name VARCHAR(150) NULL");
        await queryRunner.query("ALTER TABLE suppliers MODIFY name VARCHAR(150) NULL");
        await queryRunner.query("ALTER TABLE categories MODIFY name VARCHAR(150) NULL");
        await this.dropIndexIfExists(queryRunner, "users", "users_email_unique");
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

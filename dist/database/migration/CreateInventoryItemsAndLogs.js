export class CreateInventoryItemsAndLogs1711000003000 {
    constructor() {
        this.name = "CreateInventoryItemsAndLogs1711000003000";
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE inventory_items (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        product_id BIGINT NULL,
        warehouse_location VARCHAR(150) NULL,
        quantity INT NULL,
        status ENUM('IN_STOCK','LOW_STOCK','OUT_OF_STOCK','RESERVED') NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_inventory_items_products FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE inventory_logs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        inventory_item_id BIGINT NULL,
        action_type VARCHAR(50) NULL,
        quantity INT NULL,
        note TEXT NULL,
        created_by BIGINT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_inventory_logs_items FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id),
        CONSTRAINT fk_inventory_logs_users FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
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
        await queryRunner.query(`
      CREATE TABLE stocks (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        detail_id BIGINT NULL,
        supply_id BIGINT NULL,
        qty FLOAT NULL,
        unit_price FLOAT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id BIGINT NULL,
        CONSTRAINT fk_inventory_details_id_stocks FOREIGN KEY (detail_id) REFERENCES inventory_details(id),
        CONSTRAINT fk_suppliers_id_stocks FOREIGN KEY (supply_id) REFERENCES suppliers(id),
        CONSTRAINT fk_users_id_stocks FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE stocks");
        await queryRunner.query("DROP TABLE inventory_details");
        await queryRunner.query("DROP TABLE inventory_logs");
        await queryRunner.query("DROP TABLE inventory_items");
    }
}

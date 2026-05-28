import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInventorySchema implements MigrationInterface {
  name = "CreateInventorySchema";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE roles (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await queryRunner.query(`
      CREATE TABLE users (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        role_id BIGINT NOT NULL,
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NULL,
        status BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE activity_logs (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        user_id BIGINT NOT NULL,
        activity VARCHAR(255) NOT NULL,
        ip_address VARCHAR(50) NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_activity_logs_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    await queryRunner.query(`
      CREATE TABLE categories (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL,
        description TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await queryRunner.query(`
      CREATE TABLE suppliers (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL,
        contact_person VARCHAR(150) NULL,
        email VARCHAR(150) NULL,
        phone VARCHAR(20) NULL,
        address TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await queryRunner.query(`
      CREATE TABLE products (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        category_id BIGINT NOT NULL,
        created_by BIGINT NOT NULL,
        name VARCHAR(150) NOT NULL,
        sku VARCHAR(150) NOT NULL UNIQUE,
        barcode VARCHAR(150) NULL UNIQUE,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_products_categories FOREIGN KEY (category_id) REFERENCES categories(id),
        INDEX products_index_0 (category_id, created_by)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE inventory (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        product_id BIGINT NOT NULL,
        warehouse_location VARCHAR(150) NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        status ENUM('in_stock','low_stock','out_of_stock','damaged') NOT NULL DEFAULT 'out_of_stock',
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_inventory_products FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    await queryRunner.query(`
      CREATE TABLE inventory_logs (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        inventory_item_id BIGINT NOT NULL,
        action_type VARCHAR(50) NOT NULL,
        quantity INT NOT NULL,
        note TEXT NULL,
        created_by BIGINT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_inventory_logs_items FOREIGN KEY (inventory_item_id) REFERENCES inventory(id) ON DELETE CASCADE,
        CONSTRAINT fk_inventory_logs_users FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE inventory_logs");
    await queryRunner.query("DROP TABLE inventory");
    await queryRunner.query("DROP TABLE products");
    await queryRunner.query("DROP TABLE suppliers");
    await queryRunner.query("DROP TABLE categories");
    await queryRunner.query("DROP TABLE activity_logs");
    await queryRunner.query("DROP TABLE users");
    await queryRunner.query("DROP TABLE roles");
  }
}

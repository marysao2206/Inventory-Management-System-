export class CreateProducts1711000002000 {
    constructor() {
        this.name = "CreateProducts1711000002000";
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE products (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        category_id BIGINT NULL,
        name VARCHAR(150) NULL,
        sku VARCHAR(150) NULL,
        barcode VARCHAR(150) NULL UNIQUE,
        price DECIMAL(10,2) NULL,
        image_url TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_by BIGINT NULL,
        INDEX products_index_0 (category_id, created_by),
        CONSTRAINT fk_products_categories FOREIGN KEY (category_id) REFERENCES categories(id),
        CONSTRAINT fk_users_id_products FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE products");
    }
}

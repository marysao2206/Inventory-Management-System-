export class CreateProductsTable1711000000006 {
    constructor() {
        this.name = 'CreateProductsTable1711000000006';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE products (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        category_id BIGINT NOT NULL,
        supplier_id BIGINT NOT NULL,
        name VARCHAR(150) NOT NULL,
        sku VARCHAR(150) NOT NULL UNIQUE,
        barcode VARCHAR(150) NULL UNIQUE,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_products_categories FOREIGN KEY (category_id) REFERENCES categories(id),
        CONSTRAINT fk_products_suppliers FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE products`);
    }
}

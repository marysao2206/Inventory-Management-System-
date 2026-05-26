import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInventoryItemsTable1711000000007 implements MigrationInterface {
  name = 'CreateInventoryItemsTable1711000000007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE inventory_items (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        product_id BIGINT NOT NULL,
        warehouse_location VARCHAR(150) NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        status ENUM('in_stock','low_stock','out_of_stock','damaged') NOT NULL DEFAULT 'out_of_stock',
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_inventory_items_products FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE inventory_items`);
  }
}


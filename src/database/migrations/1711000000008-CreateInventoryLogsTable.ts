import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInventoryLogsTable1711000000008 implements MigrationInterface {
  name = 'CreateInventoryLogsTable1711000000008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE inventory_logs (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        inventory_item_id BIGINT NOT NULL,
        action_type VARCHAR(50) NOT NULL,
        quantity INT NOT NULL,
        note TEXT NULL,
        created_by BIGINT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_inventory_logs_items FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id) ON DELETE CASCADE,
        CONSTRAINT fk_inventory_logs_users FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE inventory_logs`);
  }
}

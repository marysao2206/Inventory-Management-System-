import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSuppliersTable1711000000005 implements MigrationInterface {
  name = 'CreateSuppliersTable1711000000005';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE suppliers`);
  }
}


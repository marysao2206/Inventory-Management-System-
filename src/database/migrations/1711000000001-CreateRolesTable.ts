import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolesTable1711000000001 implements MigrationInterface {
  name = 'CreateRolesTable1711000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE roles (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE roles`);
  }
}

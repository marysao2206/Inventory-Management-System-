import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingSupplierContactName1711000009000 implements MigrationInterface {
  name = "AddMissingSupplierContactName1711000009000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasColumn("suppliers", "contact_name"))) {
      await queryRunner.query("ALTER TABLE suppliers ADD contact_name VARCHAR(150) NULL AFTER name");
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasColumn("suppliers", "contact_name")) {
      await queryRunner.query("ALTER TABLE suppliers DROP COLUMN contact_name");
    }
  }
}

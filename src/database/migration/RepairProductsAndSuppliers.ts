import { MigrationInterface, QueryRunner } from "typeorm";

export class RepairProductsAndSuppliers1711000008000 implements MigrationInterface {
  name = "RepairProductsAndSuppliers1711000008000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasColumn("suppliers", "updated_at"))) {
      await queryRunner.query(
        "ALTER TABLE suppliers ADD updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at"
      );
    }

    if (!(await queryRunner.hasColumn("products", "supplier_id"))) {
      await queryRunner.query("ALTER TABLE products ADD supplier_id BIGINT NULL AFTER category_id");
    }

    await this.addForeignKeyIfMissing(queryRunner, "products", "fk_products_suppliers", "supplier_id", "suppliers", "id");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropForeignKeyIfExists(queryRunner, "products", "fk_products_suppliers");

    if (await queryRunner.hasColumn("products", "supplier_id")) {
      await queryRunner.query("ALTER TABLE products DROP COLUMN supplier_id");
    }

    if (await queryRunner.hasColumn("suppliers", "updated_at")) {
      await queryRunner.query("ALTER TABLE suppliers DROP COLUMN updated_at");
    }
  }

  private async addForeignKeyIfMissing(
    queryRunner: QueryRunner,
    tableName: string,
    foreignKeyName: string,
    columnName: string,
    referencedTableName: string,
    referencedColumnName: string
  ): Promise<void> {
    const table = await queryRunner.getTable(tableName);
    if (!table?.foreignKeys.some((foreignKey) => foreignKey.name === foreignKeyName)) {
      await queryRunner.query(
        `ALTER TABLE ${tableName} ADD CONSTRAINT ${foreignKeyName} FOREIGN KEY (${columnName}) REFERENCES ${referencedTableName}(${referencedColumnName})`
      );
    }
  }

  private async dropForeignKeyIfExists(queryRunner: QueryRunner, tableName: string, foreignKeyName: string): Promise<void> {
    const table = await queryRunner.getTable(tableName);
    if (table?.foreignKeys.some((foreignKey) => foreignKey.name === foreignKeyName)) {
      await queryRunner.query(`ALTER TABLE ${tableName} DROP FOREIGN KEY ${foreignKeyName}`);
    }
  }
}

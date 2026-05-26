import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDbmlUniqueIndexes1711000007000 implements MigrationInterface {
  name = "AddDbmlUniqueIndexes1711000007000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.addUniqueIndexIfMissing(queryRunner, "users", "users_phone_unique", "phone");
    await this.addUniqueIndexIfMissing(queryRunner, "suppliers", "suppliers_email_unique", "email");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropIndexIfExists(queryRunner, "suppliers", "suppliers_email_unique");
    await this.dropIndexIfExists(queryRunner, "users", "users_phone_unique");
  }

  private async addUniqueIndexIfMissing(
    queryRunner: QueryRunner,
    tableName: string,
    indexName: string,
    columnName: string
  ): Promise<void> {
    const table = await queryRunner.getTable(tableName);
    if (!table?.indices.some((index) => index.name === indexName)) {
      await queryRunner.query(`ALTER TABLE ${tableName} ADD UNIQUE INDEX ${indexName} (${columnName})`);
    }
  }

  private async dropIndexIfExists(queryRunner: QueryRunner, tableName: string, indexName: string): Promise<void> {
    const table = await queryRunner.getTable(tableName);
    if (table?.indices.some((index) => index.name === indexName)) {
      await queryRunner.query(`ALTER TABLE ${tableName} DROP INDEX ${indexName}`);
    }
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailVerificationToUsers1711000004000 implements MigrationInterface {
  name = "AddEmailVerificationToUsers1711000004000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      ADD email_verified BOOLEAN NOT NULL DEFAULT FALSE,
      ADD email_verification_code_hash VARCHAR(255) NULL,
      ADD email_verification_expires_at TIMESTAMP NULL,
      ADD email_verified_at TIMESTAMP NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN email_verified_at,
      DROP COLUMN email_verification_expires_at,
      DROP COLUMN email_verification_code_hash,
      DROP COLUMN email_verified
    `);
  }
}

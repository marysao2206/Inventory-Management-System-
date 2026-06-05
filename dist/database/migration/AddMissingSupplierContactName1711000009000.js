export class AddMissingSupplierContactName1711000009000 {
    constructor() {
        this.name = "AddMissingSupplierContactName1711000009000";
    }
    async up(queryRunner) {
        if (!(await queryRunner.hasColumn("suppliers", "contact_name"))) {
            await queryRunner.query("ALTER TABLE suppliers ADD contact_name VARCHAR(150) NULL AFTER name");
        }
    }
    async down(queryRunner) {
        if (await queryRunner.hasColumn("suppliers", "contact_name")) {
            await queryRunner.query("ALTER TABLE suppliers DROP COLUMN contact_name");
        }
    }
}

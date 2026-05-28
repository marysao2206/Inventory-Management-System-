export class CreatePaymentsTable1711000000010 {
    constructor() {
        this.name = 'CreatePaymentsTable1711000000010';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE payments (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        order_id BIGINT NOT NULL,
        transaction_id VARCHAR(255) NULL,
        khqr_token TEXT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'KHQR',
        status VARCHAR(30) DEFAULT 'PENDING',
        paid_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_payments_orders FOREIGN KEY (order_id) REFERENCES orders(id)
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE payments`);
    }
}

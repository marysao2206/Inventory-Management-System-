import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ name: "order_id", type: "bigint" })
  orderId!: string;

  @Column({ name: "transaction_id", type: "varchar", length: 255, nullable: true })
  transactionId?: string | null;

  @Column({ name: "khqr_token", type: "text", nullable: true })
  khqrToken?: string | null;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: string;

  @Column({ name: "payment_method", type: "varchar", length: 50, default: "KHQR" })
  paymentMethod!: string;

  @Column({ type: "varchar", length: 30, default: "PENDING" })
  status!: string;

  @Column({ name: "paid_at", type: "timestamp", nullable: true })
  paidAt?: Date | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date;
}

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ name: "category_id", type: "bigint" })
  categoryId!: string;

  @Column({ name: "supplier_id", type: "bigint" })
  supplierId!: string;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ type: "varchar", length: 150, unique: true })
  sku!: string;

  @Column({ type: "varchar", length: 150, unique: true, nullable: true })
  barcode?: string | null;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: string;

  @Column({ name: "image_url", type: "text", nullable: true })
  imageUrl?: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;
}
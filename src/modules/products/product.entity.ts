import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne , JoinColumn } from "typeorm";
import { Category } from "../categories/category.entity.js";
import { Supplier } from "../suppliers/supplier.entity.js";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id"})
  category!: Category;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: "supplier_id"})
  supplier!: Supplier;

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

  @Column({ name: "created_by", type: "bigint", nullable: true})
  createdBy?: string | null;
}
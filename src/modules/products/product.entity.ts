import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Category } from "../categories/category.entity";
import { InventoryItem } from "../inventory/inventory.entity";

@Index("products_index_0", ["categoryId", "createdById"])
@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: string;

  @Column({
    name: "category_id",
    type: "bigint",
  })
  categoryId!: string;

  @Column({
    name: "created_by",
    type: "bigint",
  })
  createdById!: string;

  @Column({
    type: "varchar",
    length: 150,
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 150,
    unique: true,
  })
  sku!: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: true,
  })
  barcode?: string | null;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({
    name: "image_url",
    type: "text",
    nullable: true,
  })
  imageUrl?: string | null;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  createdAt!: Date;

  // Relations
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @OneToMany(
    () => InventoryItem,
    (inventoryItem) => inventoryItem.product
  )
  inventoryItems!: InventoryItem[];
}

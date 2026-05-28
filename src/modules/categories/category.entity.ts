import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../products/product.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("increment", {
    type: "bigint",
  })
  id!: string;

  @Column({
    type: "varchar",
    length: 150,
  })
  name!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string | null;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  createdAt!: Date;

  // Relations
  @OneToMany(
    () => Product,
    (product) => product.category
  )
  products!: Product[];
}

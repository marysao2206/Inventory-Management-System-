import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "../users/user.entity.js";

@Entity("activity_logs")
export class ActivityLog {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ name: "user_id", type: "bigint", nullable: true })
  userId?: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  activity?: string | null;

  @Column({ name: "ip_address", type: "varchar", length: 50, nullable: true })
  ipAddress?: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.activityLogs)
  @JoinColumn({ name: "user_id" })
  user?: User | null;
}

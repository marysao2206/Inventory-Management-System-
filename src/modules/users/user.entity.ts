import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Role } from "../auth/auth.entity";
import { ActivityLog } from "../auth/activity-log.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ name: "role_id", type: "bigint", nullable: true })
  roleId?: string | null;

  @Column({ name: "full_name", type: "varchar", length: 150, nullable: true })
  fullName!: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password!: string;

  @Column({ type: "varchar", length: 20, unique: true, nullable: true })
  phone?: string | null;

  @Column({ type: "boolean", nullable: true })
  status!: boolean;

  @Column({ name: "email_verified", type: "boolean", default: false })
  emailVerified!: boolean;

  @Column({ name: "email_verification_code_hash", type: "varchar", length: 255, nullable: true })
  emailVerificationCodeHash?: string | null;

  @Column({ name: "email_verification_expires_at", type: "timestamp", nullable: true })
  emailVerificationExpiresAt?: Date | null;

  @Column({ name: "email_verified_at", type: "timestamp", nullable: true })
  emailVerifiedAt?: Date | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: "role_id" })
  role?: Role;

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLogs!: ActivityLog[];

}

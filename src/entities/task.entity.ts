import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  description: string;

  @Column({ default: false })
  is_complete: boolean;

  @ManyToOne((type) => User, (user) => user.tasks)
  user: User;
}

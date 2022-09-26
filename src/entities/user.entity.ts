import { compare, hash } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { Task } from "./task.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  user_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_superuser: boolean;

  @OneToMany((type) => Task, (task) => task.user, {
    eager: true,
  })
  tasks: Task[];

  comparePwd = async (pwd: string): Promise<boolean> => {
    return await compare(pwd, this.password);
  };

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    return this.password && (this.password = await hash(this.password, 10));
  }
}

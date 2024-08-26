import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./role.schema";


@Entity({name: 'users'})
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  firstname: string;

  @Column("text", { nullable: false })
  lastname: string;

  @Column("text", { nullable: false })
  email: string;

  @Column("text", { nullable: false })
  password: string;

  @OneToOne(type => Roles, role => role.id, { nullable: false })
  role: number;

  @Column("boolean", { default: false })
  isActive: boolean
}

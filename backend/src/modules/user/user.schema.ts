import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './role.schema';

@Entity({ name: 'users' })
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  firstname: string;

  @Column('text', { nullable: false })
  lastname: string;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: true })
  phone: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('text', { nullable: true })
  telegram: string;

  @OneToOne(() => Roles, (role) => role.id, { nullable: false })
  role: number;

  @Column('boolean', { default: false })
  isActive: boolean;

  @Column('boolean', { default: false })
  isClient: boolean;
}

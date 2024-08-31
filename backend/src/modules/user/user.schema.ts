import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleSchema } from '@/utils/schemas/role.schema';
import { UserDB } from '@/utils/types/user';

@Entity({ name: 'users' })
export class UserSchema implements UserDB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  firstname: string;

  @Column('text', { nullable: false })
  lastname: string;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  email: string;

  @Column('varchar', { length: 20, nullable: true, unique: true })
  phone: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('text', { nullable: true })
  telegram: string;

  @ManyToOne(() => RoleSchema, (role) => role.id, { nullable: false })
  @JoinColumn()
  role: RoleSchema;

  @Column('boolean', { default: false })
  isActive: boolean;

  @Column('boolean', { default: false })
  isClient: boolean;
}

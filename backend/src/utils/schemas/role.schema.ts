import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@/utils/types/meta';
import { UserSchema } from '@/modules/user/user.schema';

@Entity({ name: 'roles' })
export class RoleSchema implements Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  title: string;

  @Column('json')
  access: string;

  @OneToMany(() => UserSchema, (user) => user.role)
  users: UserSchema[];
}

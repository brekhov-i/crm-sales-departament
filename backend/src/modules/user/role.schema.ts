import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Roles {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { nullable: false })
  name: string

  @Column('text', { nullable: false })
  title: string

  @Column('json')
  access: string
}

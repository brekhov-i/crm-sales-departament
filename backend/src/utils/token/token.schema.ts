import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tokens'})
export class TokenSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  user: number;

  @Column('text', {nullable: false})
  refresh_token: string
}

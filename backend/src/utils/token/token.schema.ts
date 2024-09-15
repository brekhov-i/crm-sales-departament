import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tokens' })
export class TokenSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user: number;

  @Column('text', { nullable: false })
  refresh_token: string;

  @Column('text', { nullable: true })
  userAgent: string;
}

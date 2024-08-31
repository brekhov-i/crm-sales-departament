import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'statusAppartments' })
export class StatusApartmentsSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  value: string;
}

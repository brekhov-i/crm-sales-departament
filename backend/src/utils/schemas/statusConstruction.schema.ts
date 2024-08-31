import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'statusConstruction' })
export class StatusConstructionSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  value: string;
}

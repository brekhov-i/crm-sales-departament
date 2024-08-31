import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'materialConstruction' })
export class MaterialConstructionSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  value: string;
}

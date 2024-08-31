import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('apartmentType')
export class ApartmentTypeSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  value: string;
}

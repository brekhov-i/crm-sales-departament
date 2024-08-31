/**
 * Структура таблицы со зданиями
 */

// {
//   id: 1,
//   name: "",
//   description: "",
//   deadline: 12354543346,
//   quantity: 1,
//   statusConstruction: "Возведение стен",
//   materialConstruction: "Кирпич",
//   concrateGrade: "марка бетона",
//   depthOuter: 3,
//   depthInpterAppartment: 4,
//   depthInteriorWell: 1,
//   quantityFloors: 22,
//   quantityAppartments: 1000,
//   soldAppartments: 30,
//   bookedAppartments: 800,
//   statusAppartments: "чистовая",
//   statusAppartmentsDescription: "Входная дверь",
//   infrastructure: "Садик",
//   appartments: "",
// }

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApartmentSchema } from '@/modules/apartment/apartment.schema';
import { MaterialConstructionSchema } from '@/utils/schemas/materialConstruction.schema';
import { StatusApartmentsSchema } from '@/utils/schemas/statusApartments.schema';
import { StatusConstructionSchema } from '@/utils/schemas/statusConstruction.schema';

@Entity('products')
export class ProductSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('date')
  deadline: number;

  @Column('int')
  quantity: number; //Кол-во домов

  @OneToOne(
    () => StatusConstructionSchema,
    (StatusConstructionSchema) => StatusConstructionSchema.id,
  )
  statusConstruction: StatusConstructionSchema; //Статус стройки

  @OneToOne(
    () => MaterialConstructionSchema,
    (MaterialConstructionSchema) => MaterialConstructionSchema.id,
  )
  materialConstruction: MaterialConstructionSchema; //Материал постройки (кирпич, газоблок)

  @Column('text')
  concrateGrade: string; //Марка бетона

  @Column('int')
  depthOuter: number; //Толщина наружней стены

  @Column('int')
  depthInterApartment: number; //Толщина межквартирной стены

  @Column('int')
  depthInteriorWell: number; //Толщина межквартирной стены

  @Column('int')
  quantityFloors: number; //Количество этажей

  @Column('int')
  quantityApartments: number; //Общее количество квартир

  @Column('int')
  soldApartments: number; //Количество проданных квартир

  @Column('int')
  bookedApartments: number; //Количество забронированных квартир

  @OneToOne(
    () => StatusApartmentsSchema,
    (StatusApartmentsSchema) => StatusApartmentsSchema.id,
  )
  statusApartments: StatusApartmentsSchema; //Состояние сдачи квартир (чистовая, предчистовая, черновая)

  @Column('text')
  statusApartmentsDescription: string; //Описание состояния сдачи

  @Column('text')
  infrastructure: string; //Дополнительная инфраструктура

  @OneToMany(() => ApartmentSchema, (ApartmentSchema) => ApartmentSchema.id, {
    nullable: true,
  })
  apartments: ApartmentSchema;

  @CreateDateColumn()
  createDate: number;

  @UpdateDateColumn()
  updateDate: number;
}

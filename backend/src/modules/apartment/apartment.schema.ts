import { UserSchema } from '@/modules/user/user.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApartmentTypeSchema } from '@/modules/typeApartment/apartmentsType.schema';

@Entity('apartments')
export class ApartmentSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => ApartmentTypeSchema,
    (ApartmentTypeSchema) => ApartmentTypeSchema.id,
  )
  type: ApartmentTypeSchema; //Тип (квартира, парковочное место, офис)

  @Column('int')
  number: number; //Номер квартиры

  @Column('text')
  status: string; //Статус (свободен, забронирован, продан)

  @OneToOne(() => UserSchema, (user) => user.id, { nullable: true })
  owner: UserSchema; //Владелец квартиры, устанавливается только когда квартира продана

  @Column('int')
  quadrature: number; //Общая квадратура

  @Column('int')
  quadratureApartment: number; //Квадратура квартиры

  @Column('int')
  quadratureBalcony: number; //Квадратура балкона

  @Column('int')
  quantityRoom: number; //Количество комнат

  @Column('int')
  price: number; //Цена за 1м по 100% оплате

  @CreateDateColumn()
  createDate: number;
}

/**
 * Структура клиента
 *
 * 1. Фамилия
 * 2. Имя
 * 3. Отчество
 * 4. Номера телефонов
 * 5. telegram
 * 6. instagram
 * 7. facebook
 * 6. Мессенжер (Может быть один или несколько?)
 * 7. Источник из которого он пришел
 * 8. История взаимодействия с комментариями (Это блок комментарии в карточке клиента?)
 * 9. Список объектов, которыми заинтересовался, забронировал, купил
 * 10. Менеджер, который работает с данным клиентом
 */

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserSchema } from '../user/user.schema';
import { Client } from '@/utils/types/client';

@Entity({ name: 'clients' })
export class ClientSchema implements Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstname: string;

  @Column('text')
  lastname: string;

  @Column('text', { nullable: true })
  surname: string;

  @Column('text')
  phone: string;

  @Column('text', { nullable: true })
  telegram: string;

  @Column('text', { nullable: true })
  facebook: string;

  @Column('text', { nullable: true })
  instagram: string;

  @Column('text')
  source: string; //Истоник из которого пришел клиент

  @ManyToOne(() => UserSchema, (user) => user.id)
  @JoinColumn()
  manager: UserSchema;
}

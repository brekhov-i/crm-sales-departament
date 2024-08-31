import { Client } from '@/utils/types/client';
import { User } from '@/utils/types/user';

export class ClientDto implements Client {
  id: number;
  firstname: string;
  lastname: string;
  surname: string;
  phone: string;
  telegram: string;
  facebook: string;
  instagram: string;
  source: string;
  manager: User;

  constructor(model: Client) {
    this.id = model.id;
    this.firstname = model.firstname;
    this.lastname = model.lastname;
    this.surname = model.surname;
    this.phone = model.phone;
    this.telegram = model.telegram;
    this.facebook = model.facebook;
    this.instagram = model.instagram;
    this.source = model.source;
    this.manager = model.manager;
  }
}

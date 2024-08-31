import { User } from '@/utils/types/user';

export interface ClientBody {
  firstname: string;
  lastname: string;
  surname: string;
  phone: string;
  source: string;
  manager: number;
  telegram?: string;
  facebook?: string;
  instagram?: string;
}

export interface Client extends ClientBody {
  id: number;
  telegram: string;
  facebook: string;
  instagram: string;
  manager: User;
}

import { Role } from '@/utils/types/meta';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: Role;
  isActive: boolean;
}

export interface UserBody extends User {
  roleId: number;
}

export interface UserDB extends User {
  password: string;
}

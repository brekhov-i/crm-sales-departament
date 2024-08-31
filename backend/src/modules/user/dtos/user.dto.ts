import { UserBody, UserDB } from '@/utils/types/user';
import { Role } from '@/utils/types/meta';

export class UserDto implements UserBody {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  roleId: number;
  role: Role;
  telegram: string;
  isActive: boolean;

  constructor(model: UserDB) {
    this.id = model.id;
    this.firstname = model.firstname;
    this.lastname = model.lastname;
    this.email = model.email;
    this.phone = model.phone;
    if (model.role) {
      this.roleId = model.role.id;
      this.role = model.role;
    }
    this.isActive = model.isActive;
  }
}

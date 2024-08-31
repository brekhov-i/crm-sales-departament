import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserSchema } from './user.schema';
import { RoleSchema } from '@/utils/schemas/role.schema';
import { RegisterBody } from '@/utils/types/auth';
import { UserBody } from '@/utils/types/user';
import { UserDto } from '@/modules/user/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(RoleSchema) private roleModel: Repository<RoleSchema>,
    @InjectRepository(UserSchema) private userModel: Repository<UserSchema>,
  ) {}

  async getUsers() {
    return await this.userModel.find({ relations: ['role'] }).then((res) => {
      return res.map((user) => new UserDto(user));
    });
  }

  async getUserById(id: number) {
    const user = await this.userModel.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user)
      throw new HttpException(`Пользователь с id ${id}`, HttpStatus.NOT_FOUND);

    return new UserDto(user);
  }

  async createUser(body: RegisterBody) {
    const candidate = await this.userModel.findOne({
      where: { email: body.email },
    });

    if (candidate)
      throw new HttpException(
        'Пользователь уже существует',
        HttpStatus.CONFLICT,
      );

    const hashPassword = hashSync(body.password, genSaltSync(10));

    const role = await this.roleModel.findOne({ where: { name: 'user' } });

    const user = this.userModel.create({
      ...body,
      password: hashPassword,
      role: role,
    });

    await this.userModel.save(user).then(() => {
      throw new HttpException('Пользователь создан', HttpStatus.CREATED);
    });
  }

  async updateUser(id: number, user: UserBody) {
    const userDB = await this.userModel.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!userDB)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

    let role = userDB.role;
    if (user.role)
      await this.roleModel
        .findOne({
          where: { id: user.roleId },
        })
        .then((res) => {
          role = res;
        });
    return await this.userModel.update(id, { ...user, role });
  }

  async deleteUser(id: number) {
    return await this.userModel.delete(id);
  }
}

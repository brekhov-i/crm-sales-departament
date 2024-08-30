import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from './user.schema';
import { Repository } from 'typeorm';
import { LoginBody, RegistrationBody, RoleBody, User } from './user.types';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';
import { TokenService } from 'src/utils/token/token.service';
import { payload, Tokens } from '@/utils/token/token.types';
import { Roles } from './role.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Roles) private roleModel: Repository<Roles>,
    @InjectRepository(UserSchema) private userModel: Repository<UserSchema>,
    private tokenService: TokenService,
  ) {}

  async getUser() {
    const users = await this.userModel.find();

    return users;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findOneBy({ id: Number(id) });

    if (!user)
      throw new HttpException(`Пользователь с id ${id}`, HttpStatus.NOT_FOUND);

    return user;
  }

  async login({ email, password }: LoginBody) {
    const candidate = await this.userModel.findOne({ where: { email } });

    if (!candidate)
      throw new HttpException(
        'Ошибка в email или пароле. Повторите попытку',
        HttpStatus.UNAUTHORIZED,
      );

    const isValid = compareSync(password, candidate.password);

    if (!isValid)
      throw new HttpException(
        'Ошибка в email или пароле. Повторите попытку',
        HttpStatus.UNAUTHORIZED,
      );

    delete candidate.password;
    const payload: payload = {
      user: candidate,
    };

    const token = await this.tokenService.generateToken(payload);
    await this.tokenService.saveToken(candidate.id, token.refresh_token);

    return {
      user: candidate,
      tokens: {
        ...token,
      },
    };
  }

  async registration(body: RegistrationBody) {
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
      role: role.id,
    });

    await this.userModel.save(user).then(() => {
      throw new HttpException('Пользователь создан', HttpStatus.CREATED);
    });
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    if (!refreshToken) throw new UnauthorizedException();
    const user = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await this.tokenService.findToken(refreshToken);

    if (!user || !tokenFromDB) throw new UnauthorizedException();

    const payload: payload = {
      user,
    };

    const tokens = await this.tokenService.generateToken(payload);
    await this.tokenService.saveToken(user.id, tokens.refresh_token);

    return {
      ...tokens,
    };
  }

  async updateUser(user: User) {
    return await this.userModel.save(user);
  }

  async createRole(body: RoleBody) {
    const candidate = await this.roleModel.findOne({
      where: { name: body.name },
    });

    if (candidate)
      throw new HttpException('Такая роль уже существует', HttpStatus.CONFLICT);

    const newRole = this.roleModel.create({
      ...body,
      access: JSON.stringify(body.access),
    });

    await this.roleModel.save(newRole).then(() => {
      throw new HttpException('Роль создана', HttpStatus.CREATED);
    });
  }
}

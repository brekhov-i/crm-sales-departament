import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginBody } from '@/modules/user/user.types';
import { Tokens } from '@/utils/token/token.types';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from '@/modules/user/user.schema';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import type { payload } from '@/utils/token/token.types';
import { TokenService } from '@/utils/token/token.service';
import { UserDto } from '@/modules/user/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchema) private userModel: Repository<UserSchema>,
    private tokenService: TokenService,
  ) {}

  async login({ email, password }: LoginBody) {
    const candidate = await this.userModel.findOne({
      where: { email },
      relations: ['role'],
    });

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
      user: new UserDto(candidate),
      tokens: {
        ...token,
      },
    };
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
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { payload, Tokens } from './token.types';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenSchema } from './token.schema';
import { Repository } from 'typeorm';
import { User } from '@/utils/types/user';
import { UserPayload } from '@/modules/user/dtos/user.dto';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(TokenSchema) private tokenModel: Repository<TokenSchema>,
  ) {}

  async generateToken(payload: payload): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('secret_access'),
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('secret_refresh'),
      expiresIn: '30d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  validateAccessToken(accessToken: string): UserPayload {
    try {
      return this.jwtService.verify(accessToken, {
        secret: this.configService.get('secret_access'),
      }).user;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string): UserPayload {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: this.configService.get('secret_refresh'),
      });
    } catch (e) {
      return null;
    }
  }

  async findToken(RefreshToken: string) {
    return await this.tokenModel.findOne({
      where: { refresh_token: RefreshToken },
    });
  }

  async saveToken(userId: number, refreshToken: string, userAgent: string) {
    const tokenData = await this.tokenModel.findOne({
      where: { user: userId, userAgent },
    });

    if (tokenData) {
      tokenData.refresh_token = refreshToken;
      return await this.tokenModel.save(tokenData);
    }

    const token = this.tokenModel.create({
      user: userId,
      refresh_token: refreshToken,
      userAgent,
    });
    return await this.tokenModel.save(token);
  }
}

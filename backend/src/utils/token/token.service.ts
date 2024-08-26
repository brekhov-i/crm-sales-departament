import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { payload, Tokens } from "./token.types";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenSchema } from "./token.schema";
import { Repository } from "typeorm";
import { User } from "@/modules/user/user.types";


@Injectable()
export class TokenService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(TokenSchema) private tokenModel: Repository<TokenSchema>
  ) { }

  async generateToken(payload: payload): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(payload, { secret: this.configService.get('secret_access'), expiresIn: '1d' });
    const refreshToken = await this.jwtService.signAsync(payload, { secret: this.configService.get('secret_refresh'), expiresIn: '30d' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  validateAccessToken(accessToken: string): User {
    try {
      const user = this.jwtService.verify(accessToken, { secret: this.configService.get('secret_access') })
      return user
    }
    catch (e) {
      return null
    }
  }

  validateRefreshToken(refreshToken: string): User {
    try {
      const user = this.jwtService.verify(refreshToken, { secret: this.configService.get('secret_refresh') })
      return user
    }
    catch (e) {
      return null
    }
  }

  async findToken(RefreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ where: { refresh_token: RefreshToken } })
    return tokenData;
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({where: { user: userId }})

    if(tokenData) {
      tokenData.refresh_token = refreshToken;
      return await this.tokenModel.save(tokenData)
    }
    
    const token = this.tokenModel.create({user: userId, refresh_token: refreshToken})
    return await this.tokenModel.save(token)
  }

}

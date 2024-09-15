import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { TokenService } from '@/utils/token/token.service';
import { UserPayload } from '@/modules/user/dtos/user.dto';
import { MetaService } from '@/modules/meta/meta.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
    private metaService: MetaService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const roles: string | string[] = this.reflector.get(
      'roles',
      ctx.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest();

    const token = this.getToken(request);

    if (!token) {
      throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);
    }

    const payload: UserPayload = this.tokenService.validateAccessToken(token);
    const roleDB = await this.metaService.getRoleById(payload.roleId);

    if (
      (Array.isArray(roles) && roles.includes(roleDB.name)) ||
      roles === roleDB.name
    ) {
      return true;
    } else {
      throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);
    }
  }

  private getToken(req: Request) {
    return req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null;
  }
}

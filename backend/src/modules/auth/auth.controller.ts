import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { type Request, type Response } from 'express';
import { type LoginBody } from '../user/user.types';
import { Tokens } from '@/utils/token/token.types';
import { AuthService } from '@/modules/auth/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const userAgent = req.headers['user-agent'];
    const tokens: Tokens = await this.authService.refreshToken(
      refreshToken,
      userAgent,
    );
    res.cookie('refreshToken', tokens.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(tokens);
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Req() req: Request,
    @Body() body: LoginBody,
    @Res() res: Response,
  ) {
    const userAgent = req.headers['user-agent'];
    const data = await this.authService.login(body, userAgent);
    res.cookie('refreshToken', data.tokens.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(data);
  }
}

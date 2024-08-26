import { Body, Controller, Post, Get, Req, Res } from "@nestjs/common";
import { type Request, type Response } from 'express'
import { RegistrationBody, RoleBody, type LoginBody } from "./user.types";
import { UserService } from "./user.service";
import { Tokens } from "@/utils/token/token.types";


@Controller('/auth')
export class AuthController {

  constructor(
    private userService: UserService
  ) { }

  @Get('/refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const tokens: Tokens = await this.userService.refreshToken(refreshToken)
    res.cookie('refreshToken', tokens.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(tokens)
  }

  @Post('/login')
  async login(@Body() body: LoginBody, @Res() res: Response) {
    const data = await this.userService.login(body)
    res.cookie('refreshToken', data.tokens.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

    return res.json(data);
  }

  @Post('/registration')
  async registration(@Body() body: RegistrationBody) {
    await this.userService.registration(body)
  }
}

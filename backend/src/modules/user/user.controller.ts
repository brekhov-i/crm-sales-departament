import { Body, Controller, Post, Put, Delete, Param, Get, Req } from "@nestjs/common";
import { type Request } from 'express'
import { type LoginBody } from "./user.types";


@Controller('/user')
export class UserController { 

  @Get('/')
  getAllUser() {}

  @Get('/:id')
  getUserById(@Param('id') id: string) {}

  @Post('/login')
  login(@Body() body: LoginBody) {}

  @Post('/registration')
  registration(@Body() body: any) {}

  @Get('/refresh')
  refreshToken(@Req() req: Request) {}

  @Put('/update/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {}

  @Delete('/disabled/:id')
  disabledUser(@Param('id') id: string) {}
}

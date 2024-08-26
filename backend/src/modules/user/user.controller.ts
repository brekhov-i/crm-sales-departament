import { Body, Controller, Post, Put, Delete, Param, Get, Req, Res } from "@nestjs/common";
import { type Request, type Response } from 'express'
import { RegistrationBody, RoleBody, type LoginBody } from "./user.types";
import { UserService } from "./user.service";


@Controller('/user')
export class UserController { 

  constructor(
    private userService: UserService
  ) {}

  @Get('/')
  getAllUser() {
    console.log('hjgvh2')
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    console.log('hjgvh1')
  }

  @Post('/role')
  async createRole(@Body() body: RoleBody) {
    await this.userService.createRole(body)
  }

  @Put('/update/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {}

  @Delete('/disabled/:id')
  disabledUser(@Param('id') id: string) {}
}

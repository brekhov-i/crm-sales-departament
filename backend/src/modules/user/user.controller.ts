import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterBody } from '@/utils/types/auth';
import { UserBody } from '@/utils/types/user';
import { AuthGuard } from '@/modules/auth/auth.guard';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getAllUser() {
    return await this.userService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(Number(id));
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async createUser(@Body() body: RegisterBody) {
    return await this.userService.createUser(body);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UserBody) {
    return await this.userService.updateUser(Number(id), body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(Number(id));
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { RegisterBody } from '@/utils/types/auth';
import { UserBody } from '@/utils/types/user';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { Auth } from '@/utils/decorators/auth';
import { TokenService } from '@/utils/token/token.service';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getAllUser() {
    return await this.userService.getUsers();
  }
  @Get('/me')
  @Auth()
  async getMe(@Req() req: Request) {
    const payload = this.tokenService.validateAccessToken(
      req.headers.authorization.split(' ')[1],
    );
    return await this.userService.getUserById(payload.id);
  }

  @Get('/:id')
  @Auth('admin', 'all')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(Number(id));
  }

  @Post('/')
  @Auth('admin', 'all')
  async createUser(@Body() body: RegisterBody) {
    return await this.userService.createUser(body);
  }

  @Put('/me')
  @Auth()
  async updateMe(@Req() req: Request, @Body() body: UserBody) {
    const payload = this.tokenService.validateAccessToken(
      req.headers.authorization.split(' ')[1],
    );
    return await this.userService.updateUser(payload.id, body);
  }

  @Put(':id')
  @Auth('admin')
  async updateUser(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: UserBody,
  ) {
    const payload = this.tokenService.validateAccessToken(
      req.headers.authorization.split(' ')[1],
    );

    return await this.userService.updateUser(payload.id, body);
  }

  @Delete(':id')
  @Auth('admin', 'all')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(Number(id));
  }
}

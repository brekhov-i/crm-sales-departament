import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MetaService } from './meta.service';

@Controller('/meta')
export class MetaController {
  constructor(private metaService: MetaService) {}

  @Get('/material-construction')
  async getMaterialConstruction() {
    return await this.metaService.getMaterialConstruction();
  }

  @Post('/material-construction')
  async createMaterialConstruction(@Body() body: any) {
    return await this.metaService.createMaterialConstruction(body);
  }

  @Put('/material-construction/:id')
  async updateMaterialConstruction(@Param('id') id: string, @Body() body: any) {
    return await this.metaService.updateMaterialConstruction(Number(id), body);
  }

  @Delete('/material-construction/:id')
  async deleteMaterialConstruction(@Param('id') id: string) {
    return await this.metaService.deleteMaterialConstruction(Number(id));
  }

  @Get('/status-apartments')
  async getStatusApartments() {
    return await this.metaService.getStatusApartments();
  }

  @Post('/status-apartments')
  async createStatusApartments(@Body() body: any) {
    return await this.metaService.createStatusApartments(body);
  }

  @Put('/status-apartments/:id')
  async updateStatusApartments(@Param('id') id: string, @Body() body: any) {
    return await this.metaService.updateStatusApartments(Number(id), body);
  }

  @Delete('/status-apartments/:id')
  async deleteStatusApartments(@Param('id') id: string) {
    return await this.metaService.deleteStatusApartments(Number(id));
  }

  @Get('/status-construction')
  async getStatusConstruction() {
    return await this.metaService.getStatusConstruction();
  }

  @Post('/status-construction')
  async createStatusConstruction(@Body() body: any) {
    return await this.metaService.createStatusConstruction(body);
  }

  @Put('/status-construction/:id')
  async updateStatusConstruction(@Param('id') id: string, @Body() body: any) {
    return await this.metaService.updateStatusConstruction(Number(id), body);
  }

  @Delete('/status-construction/:id')
  async deleteStatusConstruction(@Param('id') id: string) {
    return await this.metaService.deleteStatusConstruction(Number(id));
  }

  @Get('/role')
  async getRoles() {
    return await this.metaService.getRoles();
  }

  @Get('/role/:id')
  async getRoleById(@Param('id') id: string) {
    return await this.metaService.getRoleById(Number(id));
  }

  @Post('/role')
  async createRole(@Body() body: any) {
    return await this.metaService.createRole(body);
  }

  @Put('/role/:id')
  async updateRole(@Param('id') id: string, @Body() body: any) {
    return await this.metaService.updateRole(Number(id), body);
  }

  @Delete('/role/:id')
  async deleteRole(@Param('id') id: string) {
    return await this.metaService.deleteRole(Number(id));
  }
}

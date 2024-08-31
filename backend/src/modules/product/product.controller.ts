import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getAllProduct(@Query() query: any) {
    return await this.productService.getAllProducts(query);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number) {
    return await this.productService.getProductById(id);
  }

  @Post('/')
  async createProduct(@Body() body: any) {
    return await this.productService.createProduct(body);
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: number, @Body() body: any) {
    return await this.productService.updateProduct(id, body);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductSchema } from './product.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductSchema)
    private productModel: Repository<ProductSchema>,
  ) {}

  async getAllProducts(query: any) {
    return await this.productModel.find({ where: { ...query } });
  }

  async getProductById(id: number) {
    return await this.productModel.findOne({ where: { id } });
  }

  async createProduct(body: any) {
    try {
      const candidate = await this.productModel.findOne({
        where: { name: body.name },
      });

      if (candidate)
        throw new HttpException(
          'Объект с таким названием уже существует',
          HttpStatus.CONFLICT,
        );

      const product = this.productModel.create(body);

      return await this.productModel.save(product);
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateProduct(id: number, body: any) {
    try {
      const candidate = await this.productModel.findOne({ where: { id } });

      if (!candidate)
        throw new HttpException(
          `Объект "${body.name}" не существует`,
          HttpStatus.NOT_FOUND,
        );

      return await this.productModel.update(id, body);
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProduct(id: number) {
    try {
      const candidate = await this.productModel.findOne({ where: { id } });

      if (!candidate) return true;

      return await this.productModel.delete(id);
    } catch (e) {
      throw new Error(e);
    }
  }
}

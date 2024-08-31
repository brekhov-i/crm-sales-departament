import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartmentTypeSchema } from './apartmentsType.schema';

@Injectable()
export class ApartmentTypeService {
  constructor(
    @InjectRepository(ApartmentTypeSchema)
    private ApartmentsModel: Repository<ApartmentTypeSchema>,
  ) {}

  async getTypeApartment(id: number) {}

  async createTypeApartment(body: any) {}

  async updateTypeApartment(id: number, body: any) {}

  async deleteTypeApartment(id: number) {}
}

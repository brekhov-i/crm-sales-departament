import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartmentSchema } from './apartment.schema';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(ApartmentSchema)
    private ApartmentsModel: Repository<ApartmentSchema>,
  ) {}

  async getApartmentById(id: number) {}

  async createApartment(body: any) {}

  async updateApartment(id: number, body: any) {}

  async deleteApartment(id: number) {}
}

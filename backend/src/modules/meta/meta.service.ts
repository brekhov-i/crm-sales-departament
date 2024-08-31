import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialConstructionSchema } from '@/utils/schemas/materialConstruction.schema';
import { Repository } from 'typeorm';
import { StatusApartmentsSchema } from '@/utils/schemas/statusApartments.schema';
import { StatusConstructionSchema } from '@/utils/schemas/statusConstruction.schema';
import { RoleSchema } from '@/utils/schemas/role.schema';

@Injectable()
export class MetaService {
  constructor(
    @InjectRepository(MaterialConstructionSchema)
    private materialConstructionModel: Repository<MaterialConstructionSchema>,
    @InjectRepository(StatusApartmentsSchema)
    private statusApartmentsModel: Repository<StatusApartmentsSchema>,
    @InjectRepository(StatusConstructionSchema)
    private statusConstructionModel: Repository<StatusConstructionSchema>,
    @InjectRepository(RoleSchema)
    private roleModel: Repository<RoleSchema>,
  ) {}

  //Материал постройки
  async getMaterialConstruction() {
    return await this.materialConstructionModel.find();
  }

  async createMaterialConstruction(body: any) {
    const candidate = await this.materialConstructionModel.findOne({
      where: { value: body.value },
    });
    if (candidate)
      throw new HttpException(
        'Такой материал стройки уже существует',
        HttpStatus.CONFLICT,
      );

    const material = this.materialConstructionModel.create(body);
    return await this.materialConstructionModel.save(material);
  }

  async updateMaterialConstruction(id: number, body: any) {
    const candidate = await this.materialConstructionModel.findOne({
      where: { id },
    });
    if (!candidate)
      throw new HttpException(
        'Такого материала стройки не существует',
        HttpStatus.NOT_FOUND,
      );

    return await this.materialConstructionModel.update(id, body);
  }

  async deleteMaterialConstruction(id: number) {
    return await this.materialConstructionModel.delete(id);
  }

  //Статус квартиры
  async getStatusApartments() {
    return await this.statusApartmentsModel.find();
  }

  async createStatusApartments(body: any) {
    const candidate = await this.statusApartmentsModel.findOne({
      where: { value: body.value },
    });
    if (candidate)
      throw new HttpException(
        'Такой "Статус квартиры" уже существует',
        HttpStatus.CONFLICT,
      );

    const material = this.statusApartmentsModel.create(body);
    return await this.statusApartmentsModel.save(material);
  }

  async updateStatusApartments(id: number, body: any) {
    const candidate = await this.statusApartmentsModel.findOne({
      where: { id },
    });
    if (!candidate)
      throw new HttpException(
        'Такого "статуса квартиры" не существует',
        HttpStatus.NOT_FOUND,
      );

    return await this.statusApartmentsModel.update(id, body);
  }

  async deleteStatusApartments(id: number) {
    return await this.statusApartmentsModel.delete(id);
  }

  //Этап строительства
  async getStatusConstruction() {
    return await this.statusConstructionModel.find();
  }

  async createStatusConstruction(body: any) {
    const candidate = await this.statusConstructionModel.findOne({
      where: { value: body.value },
    });
    if (candidate)
      throw new HttpException(
        'Такой "Этап строительства" уже существует',
        HttpStatus.CONFLICT,
      );

    const material = this.statusConstructionModel.create(body);
    return await this.statusConstructionModel.save(material);
  }

  async updateStatusConstruction(id: number, body: any) {
    const candidate = await this.statusConstructionModel.findOne({
      where: { id },
    });
    if (!candidate)
      throw new HttpException(
        'Такого "Этапа строительства" не существует',
        HttpStatus.NOT_FOUND,
      );

    return await this.statusConstructionModel.update(id, body);
  }

  async deleteStatusConstruction(id: number) {
    return await this.statusConstructionModel.delete(id);
  }

  //Роли
  async getRoles() {
    return await this.roleModel.find();
  }

  async getRoleById(id: number) {
    return await this.roleModel.findOne({ where: { id } });
  }

  async createRole(body: any) {
    const candidate = await this.roleModel.findOne({
      where: { name: body.name },
    });

    if (candidate)
      throw new HttpException('Такая роль уже существует', HttpStatus.CONFLICT);

    const role = this.roleModel.create(body);

    return await this.roleModel.save(role);
  }

  async updateRole(id: number, body: any) {
    const candidate = await this.roleModel.findOne({
      where: { name: body.name },
    });

    if (!candidate)
      throw new HttpException('Такой роли несуществует', HttpStatus.NOT_FOUND);

    return await this.roleModel.update(id, body);
  }

  async deleteRole(id: number) {
    return await this.roleModel.delete(id);
  }
}

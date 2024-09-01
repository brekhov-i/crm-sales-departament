import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentsSchema } from '@/modules/documents/documents.schema';
import { Repository } from 'typeorm';
import { resolve } from 'path';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { ClientSchema } from '@/modules/client/client.schema';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(DocumentsSchema)
    private documentModel: Repository<DocumentsSchema>,
    @InjectRepository(ClientSchema)
    private clientModel: Repository<ClientSchema>,
  ) {}

  async getTemplates() {
    return await this.documentModel.find({ where: { isGlobal: true } });
  }

  async saveTemplate(file: Express.Multer.File) {
    const candidate = await this.documentModel.findOne({
      where: { title: file.filename },
    });

    if (candidate) {
      return await this.documentModel.update(candidate.id, {
        title: file.filename,
        path: file.path,
      });
    }

    const document = this.documentModel.create({
      title: file.filename,
      path: file.path,
      isGlobal: true,
    });

    return await this.documentModel.save(document);
  }

  async saveFile(filePath: string, fileName: string, clientId: number) {
    const client = await this.clientModel.findOne({ where: { id: clientId } });

    const candidate = await this.documentModel.findOne({
      where: { title: fileName },
    });

    if (!client) {
      await this.clearDocument(filePath, candidate.id);

      throw new HttpException('Клиент не найден', HttpStatus.NOT_FOUND);
    }

    if (candidate)
      throw new HttpException('Документ обновлен', HttpStatus.CREATED);

    const file = this.documentModel.create({
      title: fileName,
      path: filePath,
      userId: client,
    });

    return await this.documentModel.save(file);
  }

  async clearDocument(filePath: string, fileId: number) {
    await this.documentModel.delete(fileId);
    unlinkSync(filePath);
  }

  /**
   * Нужно в документе проставить переменные. Документация https://docxtemplater.com/docs/
   * */
  async fillDOCX(body: any) {
    const template = readFileSync(
      resolve(__dirname, '..', '..', '..', body.templatePath),
      'binary',
    );

    const zip = new PizZip(template);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(body.data);

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    writeFileSync(body.outputPath, buf);
  }
}

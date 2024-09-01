import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { DocumentsService } from '@/modules/documents/documents.service';
import { diskStorage } from 'multer';
import { extname, join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ClientService } from '@/modules/client/client.service';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';

@Controller('/documents')
export class DocumentsController {
  constructor(
    private documentsService: DocumentsService,
    private clientService: ClientService,
  ) {}

  @Get('/template')
  async getTemplates() {
    return await this.documentsService.getTemplates();
  }

  @Post('/template')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/documents/templates', // Путь для сохранения файлов
        filename: (req, file, callback) => {
          const newFilename = `${file.originalname}`;
          callback(null, newFilename);
        },
      }),
    }),
  )
  async createTemplate(@UploadedFile() file: Express.Multer.File) {
    return await this.documentsService.saveTemplate(file);
  }

  @Post('/fill-template')
  async fillTemplate(@Body() body: any, @Res() res: Response) {
    const client = await this.clientService.getClientById(
      Number(body.clientId),
    );
    const outputDirectory = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'files',
      'documents',
    );
    const outputFileName = `${body.title}-${client.firstname}-${
      client.lastname
    }${extname(body.templatePath)}`;
    const outputPath = join(outputDirectory, outputFileName);

    if (!existsSync(outputDirectory)) {
      mkdirSync(outputDirectory, { recursive: true });
    }

    const data = {
      ...body,
      data: {
        day: dayjs().locale('ru').format('DD'),
        month: dayjs().locale('ru').format('MMMM'),
        year: dayjs().locale('ru').format('YYYY'),
        city: 'Ростов-на-Дону',
      },
      outputPath,
    };

    await this.documentsService.fillDOCX(data);

    const result = await this.documentsService.saveFile(
      outputPath,
      outputFileName,
      body.clientId,
    );

    res.json(result);
  }
}

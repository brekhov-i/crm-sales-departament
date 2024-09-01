import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsSchema } from '@/modules/documents/documents.schema';
import { DocumentsController } from '@/modules/documents/documents.controllers';
import { DocumentsService } from '@/modules/documents/documents.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientModule } from '@/modules/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentsSchema]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dest: configService.get('multer_document_dist'),
      }),
      inject: [ConfigService],
    }),
    ClientModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService, TypeOrmModule],
})
export class DocumentsModule {}

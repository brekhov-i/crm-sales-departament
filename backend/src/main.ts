import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { type NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors;
  app.useStaticAssets(join(__dirname, '..', 'assets/images'), {
    prefix: 'images'
  })

  app.use(cookieParser());

  await app.listen(3000)
}
bootstrap();

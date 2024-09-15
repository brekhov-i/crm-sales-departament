import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

// import initTelegramClient from './modules/messages/modules/telegram';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', '/assets/images'), {
    prefix: 'images',
  });

  // await initTelegramClient(process.env.api_id, process.env.api_hash);

  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();

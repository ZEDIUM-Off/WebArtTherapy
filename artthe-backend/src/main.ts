import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./secret/172.20.10.11-key.pem'),
    cert: fs.readFileSync('./secret/172.20.10.11.pem'),
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.setBaseViewsDir([
    join(__dirname, '..', '..', 'public', 'pages', 'TEL'),
    join(__dirname, '..', '..', 'public', 'pages', 'PC'),
  ]);
  app.setViewEngine('hbs');
  await app.listen(3000);
  console.log(`Application is running on: https://172.20.10.11:3000`);
}
bootstrap();

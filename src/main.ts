import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';
import { AppConfigService } from 'src/configs/app/config.service';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './filters/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(Logger));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const appConfig: AppConfigService = app.get(AppConfigService);

  // console.log(appConfig.port);
  await app.listen(appConfig.port);
}
bootstrap();

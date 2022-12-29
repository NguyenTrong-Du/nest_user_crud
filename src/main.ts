import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';
import { AppConfigService } from 'src/configs/app/config.service';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import AppResponse from './models/AppResponse';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: AppResponse.validationFailedFromValidatorErrors,
    }),
  );
  app.useLogger(app.get(Logger));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const appConfig: AppConfigService = app.get(AppConfigService);

  await app.listen(appConfig.port);
}
bootstrap();

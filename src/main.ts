import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './middlewares/cors.middleware';
import { WinstonLoggerAdapter } from './adapters/winston.adapter';
import { LogModel } from './models/logs/log.model';
import { LogSeverity } from './enums/logs/log.enum';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const winston = new WinstonLoggerAdapter();

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors(CORS);

  app.setGlobalPrefix('api');
  const config = new ConfigService();

  await app.listen(config.get('PORT'));

  const log = new LogModel(
    `app running in port ${config.get('PORT')}`,
    LogSeverity.INFO,
  );

  winston.info(log);
}
bootstrap();

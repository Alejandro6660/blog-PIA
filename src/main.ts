import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from './middlewares/cors.middleware';
import { WinstonLoggerAdapter } from './adapters/winston.adapter';
import { LogModel } from './models/logs/log.model';
import { LogSeverity } from './enums/logs/log.enum';
import { envs } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const winston = new WinstonLoggerAdapter();

  const PORT = envs.PORT;

  app.enableCors(CORS);

  app.setGlobalPrefix('api');

  await app.listen(PORT);

  const log = new LogModel(`app running in port ${PORT}`, LogSeverity.FATAL);

  winston.log(log);
}
bootstrap();

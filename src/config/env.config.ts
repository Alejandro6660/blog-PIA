import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: `.env`,
});

const config = new ConfigService();

export const envs: { [key: string]: any } = {
  PORT: config.get('PORT'),
  PATHLOG: config.get('DIR_LOG'),
};

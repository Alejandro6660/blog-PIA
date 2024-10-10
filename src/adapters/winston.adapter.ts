import { envs } from 'src/config/env.config';
import * as winston from 'winston';
import * as fs from 'fs';
import { warn } from 'console';
import { LogModel } from 'src/models/logs/log.model';

export class WinstonLoggerAdapter {
  private infoLogger: winston.Logger;
  private lowLogger: winston.Logger;
  private mediumoLogger: winston.Logger;
  private highLogger: winston.Logger;
  private fatalLogger: winston.Logger;

  private readonly logPath = envs.PATHLOG;
  private readonly logLowPath = `${envs.PATHLOG}/logs-low.log`;
  private readonly logMediumPath = `${envs.PATHLOG}/logs-medium.log`;
  private readonly logHighPath = `${envs.PATHLOG}/logs-high.log`;
  private readonly logFatalPath = `${envs.PATHLOG}/logs-fatal.log`;

  constructor() {
    this.createLogsFiles();
    this.initializerLogger();
  }

  private createLogsFiles() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    if (fs.existsSync(this.logLowPath)) return;
    fs.writeFileSync(this.logLowPath, '');

    if (fs.existsSync(this.logMediumPath)) return;
    fs.writeFileSync(this.logMediumPath, '');

    if (fs.existsSync(this.logHighPath)) return;
    fs.writeFileSync(this.logHighPath, '');

    if (fs.existsSync(this.logFatalPath)) return;
    fs.writeFileSync(this.logFatalPath, '');
  }

  private initializerLogger() {
    const levels = {
      low: 0,
      medium: 1,
      high: 2,
      fatal: 3,
      info: 4,
    };

    winston.addColors({
      low: 'bold  blue',
      medium: 'bold  yellow',
      high: 'bold orange',
      fatal: 'bold  red',
      info: 'bold green',
    });

    const format = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(({ timestamp, level, message }) => {
        return `[${level.toLocaleUpperCase()}]: {message: ${message}, date: ${timestamp}}`;
      }),
    );

    const formatConsole = winston.format.combine(
      format,
      winston.format.colorize(),
    );

    this.infoLogger = winston.createLogger({
      levels,
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: formatConsole,
        }),
        new winston.transports.File({
          filename: this.logLowPath,
          level: 'info',
          format,
        }),
      ],
    });

    this.lowLogger = winston.createLogger({
      levels,
      transports: [
        new winston.transports.Console({
          level: 'low',
          format: formatConsole,
        }),
        new winston.transports.File({
          filename: this.logLowPath,
          level: 'low',
          format,
        }),
      ],
    });
  }

  info(logModel: LogModel) {
    this.infoLogger.log(logModel.level, logModel.message);
  }

  low(logModel: LogModel) {
    this.lowLogger.log(logModel.level, logModel.message);
  }
}

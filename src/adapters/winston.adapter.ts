import { envs } from 'src/config/env.config';
import * as winston from 'winston';
import * as fs from 'fs';
import { warn } from 'console';
import { LogModel } from 'src/models/logs/log.model';

export class WinstonLoggerAdapter {
  private logger: winston.Logger;

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
    };

    winston.addColors({
      low: 'blue',
      medium: 'yellow',
      high: 'orange',
      fatal: 'red',
    });

    // Crear el logger con niveles
    this.logger = winston.createLogger({
      level: 'low',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          level: 'fatal', // Asegúrate de que este nivel esté configurado
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: this.logLowPath,
          level: 'low',
          format: winston.format.printf(({ timestamp, level, message }) => {
            return `[${level}]: ${message}  {timestamp: ${timestamp}}`;
          }),
        }),

        new winston.transports.File({
          filename: this.logMediumPath,
          level: 'medium',
          format: winston.format.printf(({ timestamp, level, message }) => {
            return `[${level}]: ${message}  {timestamp: ${timestamp}}`;
          }),
        }),

        new winston.transports.File({
          filename: this.logHighPath,
          level: 'high',
          format: winston.format.printf(({ timestamp, level, message }) => {
            return `[${level}]: ${message}  {timestamp: ${timestamp}}`;
          }),
        }),
        new winston.transports.File({
          filename: this.logFatalPath,
          level: 'fatal',
          format: winston.format.printf(({ timestamp, level, message }) => {
            return `[${level}]: ${message}  {timestamp: ${timestamp}}`;
          }),
        }),
      ],
    });
  }

  log(logModel: LogModel) {
    this.logger.log(logModel.level, logModel.message);
  }
}

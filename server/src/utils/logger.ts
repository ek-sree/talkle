import winston from "winston";
import { format } from "winston";

winston.addColors({
  info: 'green',
  error: 'red',
  warn: 'yellow',
  debug: 'blue'
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "error" : "debug",
  format: winston.format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
    format.colorize(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ],
});

export default logger;
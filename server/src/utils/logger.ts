import winston from "winston";

winston.addColors({
  info: 'green',
  error: 'red',
  warn: 'yellow',
  debug: 'blue'
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "error" : "debug",
  format: winston.format.combine(
    // winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }), 
    // new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Logs errors to file
    // new winston.transports.File({ filename: "logs/combined.log" }) // Logs all levels to file
  ],
});

export default logger;

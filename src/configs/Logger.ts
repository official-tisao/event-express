import winston from 'winston';
import 'winston-daily-rotate-file';

// Define custom log levels including trace
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
  trace: 7,
};

// Define log formats for the console and file
const consoleFormat = winston.format.combine(
  winston.format.colorize(), // Color coding log levels for terminal
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
  winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`) // Log format
);

const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json() // Logs in JSON format for files
);

// Create a logger instance
const logger = winston.createLogger({
  levels, // Use custom levels
  level: 'trace', // Log all levels down to trace
  transports: [
    // Log to console
    new winston.transports.Console({
      format: consoleFormat, // Human-readable format in the terminal
      level: 'trace', // Capture all levels
    }),
    
    // Log to a file in JSON format
    new winston.transports.File({
      filename: 'logs/log.json', // Save logs to this file
      format: jsonFormat, // Save in JSON format
      level: 'trace', // Log everything including trace
    }),

    // Optional: Daily rotate file transport for rotating logs
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log', // Rotate based on date
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m', // Limit log size to 20 MB
      maxFiles: '14d', // Keep logs for 14 days
      format: jsonFormat,
      level: 'trace',
    }),
  ],
});

// Export the logger instance to use it in other files
export default logger;
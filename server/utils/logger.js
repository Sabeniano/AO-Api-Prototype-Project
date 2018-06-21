const winston = require('winston');

const prodLogger = [
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
  new winston.transports.File({
    filename: 'combined.log',
    format:
      winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
  })
];

const devLogger = [
  new winston.transports.Console({ 
    format: 
    winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    )}
  )
]


const loggerconfig = {
  level: 'info',
  transports: process.env.NODE_ENV === 'prod' ? prodLogger : devLogger,
  silent: false,
}

const winstonLogger = winston.createLogger(loggerconfig);


module.exports = {
  log: function log(message, level) {
    if (level) {
      winstonLogger.log({level, message});
    } else {
      winstonLogger.log({level: 'info', message})
    }
  }
}
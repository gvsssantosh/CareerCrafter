// 1. Import winston module   (need to install using npm)
const winston = require('winston');
const path = require('path');

// 2. Logging configuration
const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'logs', 'ApiServiceLogs.log')
            //../logs/ApiServiceLogs.log
        })
    ],
  
    format: winston.format.combine(
        // winston.format.label({
        //     label: `Authentication API Logs`
        // }),
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
       winston.format.printf(info => `[${info.level}] - ${info.label};  ${[info.timestamp]}; Message: ${info.message}`),

    )

  

};

// 3. Create logger object
const logger = winston.createLogger(logConfiguration);

module.exports = logger; 

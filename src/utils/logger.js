const winston = require('winston');
module.exports =  winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logger/filelog-info.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logger/filelog-error.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        })
    ]
});
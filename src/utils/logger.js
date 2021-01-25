const winston = require('winston');
module.exports =  winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './filelog/filelog-info.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
        new winston.transports.File({
            level: 'error',
            filename: './filelog/filelog-error.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        })
    ]
});
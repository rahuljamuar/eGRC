require('dotenv').config({ silent: true });
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    transports: [
        new transports.Console({            
            level: 'info',
            format: format.combine(format.timestamp(), format.simple())
        }),
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),        
        new transports.Console({            
            level: 'error',
            format: format.combine(format.timestamp(), format.simple())
        }),
        new transports.File({
            filename: 'error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        }),
        
    ], meta: true
})

module.exports = logger;
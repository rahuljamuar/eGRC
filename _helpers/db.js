const sql = require('mssql')
const config = require('../config');
const logger = require('./logger');


const poolPromise = new sql.ConnectionPool(config.sql)
  .connect()
  .then(pool => {    
    logger.info('Database connected successfully');
    return pool
  })
  .catch(err => logger.error('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}
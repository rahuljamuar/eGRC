'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const logger = require('../../_helpers/logger');

const updateResponseDate = async (mapping_id, response_date) => {
    try {
        logger.info("Updating response date for mapping id " + mapping_id);
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('trigger_details');
        const update = await pool.request()
                        .input('mapping_id', sql.Numeric, mapping_id)
                        .input('response_date', sql.SmallDateTime, response_date)
                        .query(sql_queries.updateResponseDate);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {  
    updateResponseDate
}
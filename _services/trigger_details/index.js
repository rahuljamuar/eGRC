'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');

const updateResponseDate = async (email, token, mapping_id, response_date, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }
    try {
        createLogs("info", "updateResponseDate", "Trigger_Details", email, mapping_id + ", " + response_date, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('trigger_details');
        const update = await pool.request()
            .input('mapping_id', sql.Numeric, mapping_id)
            .input('response_date', sql.SmallDateTime, response_date)
            .query(sql_queries.updateResponseDate);
        elapsedTime(start, "updateResponseDate", "Trigger_Details");
        return update.recordset;
    } catch (error) {
        createLogs("error", "updateResponseDate", "Trigger_Details", email, mapping_id + ", " + response_date, error.message);
        throw error;
    }
}

module.exports = {
    updateResponseDate
}
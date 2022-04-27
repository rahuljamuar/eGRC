'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');

const getByEmailId = async(email, token, email_id) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getByEmailId", "Admin", email, email_id, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('admin_details');        
        const user = await pool.request()
                            .input('email', sql.NVarChar, email_id)
                            .query(sql_queries.adminDetailsByEmail);
        const result = user.recordset;
        elapsedTime(start, "getByEmailId", "Admin");
        return result[0];
    } catch (error) {
        createLogs("error", "getByEmailId", "Admin", email, email_id, error.message);
        throw error;
    }
}


module.exports = {
    getByEmailId
}
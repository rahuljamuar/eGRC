'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');

const getByEmailId = async(email, token, email_id) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getByEmailId", "User", email, email_id, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('user_details');        
        const user = await pool.request()
                            .input('email', sql.NVarChar, email_id)
                            .query(sql_queries.userDetailsByEmail);
        const result = user.recordset;
        elapsedTime(start, "getByEmailId", "User");
        return result[0];
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    getByEmailId
}
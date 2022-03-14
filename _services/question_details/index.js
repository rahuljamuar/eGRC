'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');


const getBySetNo = async (email, token, set_no) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getBySetNo", "Question", email, set_no, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('question_details');
        const questions = await pool.request()
            .input('set_no', sql.NVarChar, set_no)
            .query(sql_queries.questionDetailsBySetNo);
        elapsedTime(start, "getBySetNo", "Question");
        return questions.recordset;
    } catch (error) {
        createLogs("error", "getBySetNo", "Question", email, set_no, error.message);
        throw error;
    }
}


module.exports = {
    getBySetNo
}
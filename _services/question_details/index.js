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

const getQuestionBySetAndTheme = async (email, token, set, theme) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getQuestionBySetAndTheme", "Question", email, set, "");
        var start = new Date();
        var temp = {};
        temp.file_name = "Question.xlsx";
        temp.content = "data:application/vnd.ms-excel;base64,0M8R4KGxGuEAAAAAAAA";
        elapsedTime(start, "getQuestionBySetAndTheme", "Question");
        return temp;
    } catch (error) {
        createLogs("error", "getQuestionBySetAndTheme", "Question", email, country, error.message);
        throw error;
    }
}

const createQuestionDetails = async (email, token, question_file) => {
    await validateToken(email, token);
    try {
        createLogs("info", "createQuestionDetails", "Question", email, "", "");
        var start = new Date();
       
        elapsedTime(start, "createQuestionDetails", "Question");
        return "Success";
    } catch (error) {
        createLogs("error", "createQuestionDetails", "Question", email, "", error.message);
        throw error;
    }
}

const updateQuestionDetails = async (email, token, country_file) => {
    await validateToken(email, token);
    try {
        createLogs("info", "updateQuestionDetails", "Question", email, "", "");
        var start = new Date();
       
        elapsedTime(start, "updateQuestionDetails", "Question");
        return "Success";
    } catch (error) {
        createLogs("error", "updateQuestionDetails", "Question", email, "", error.message);
        throw error;
    }
}


module.exports = {
    getBySetNo,
    getQuestionBySetAndTheme,    
    createQuestionDetails,
    updateQuestionDetails
}
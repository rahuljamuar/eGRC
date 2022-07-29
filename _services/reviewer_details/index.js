'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');


const getByEmailId = async(email, token, email_id) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getByEmailId", "Reviewer", email, email_id, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('reviewer_details');        
        const user = await pool.request()
                            .input('email', sql.NVarChar, email_id)
                            .query(sql_queries.reviewerDetailsByEmail);
        const result = user.recordset;
        elapsedTime(start, "getByEmailId", "Reviewer");
        return result[0];
    } catch (error) {
        createLogs("error", "getByEmailId", "Reviewer", email, email_id, error.message);
        throw error;
    }
}

const getReviewerByStatus = async (email, token, status) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getReviewerByStatus", "Reviewer", email, status, "");
        var start = new Date();
        var temp = {};
        temp.file_name = "Reviewer.xlsx";
        temp.content = "data:application/vnd.ms-excel;base64,0M8R4KGxGuEAAAAAAAA";
        elapsedTime(start, "getReviewerByStatus", "Reviewer");
        return temp;
    } catch (error) {
        createLogs("error", "getReviewerByStatus", "Reviewer", email, status, error.message);
        throw error;
    }
}

const createReviewerDetails = async (email, token, reviewer_file) => {
    await validateToken(email, token);
    try {
        createLogs("info", "createReviewerDetails", "Reviewer", email, "", "");
        var start = new Date();
       
        elapsedTime(start, "createReviewerDetails", "Reviewer");
        return "Success";
    } catch (error) {
        createLogs("error", "createReviewerDetails", "Reviewer", email, "", error.message);
        throw error;
    }
}

const updateReviewerDetails = async (email, token, owner_file) => {
    await validateToken(email, token);
    try {
        createLogs("info", "updateReviewerDetails", "Reviewer", email, "", "");
        var start = new Date();
       
        elapsedTime(start, "updateReviewerDetails", "Reviewer");
        return "Success";
    } catch (error) {
        createLogs("error", "updateReviewerDetails", "Reviewer", email, "", error.message);
        throw error;
    }
}


module.exports = {
    getByEmailId,
    getReviewerByStatus,    
    createReviewerDetails,
    updateReviewerDetails
}
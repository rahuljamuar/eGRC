'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const file = require('../../_helpers/file');
const validateToken = require('../../_helpers/validateToken');
const readXlsxFile = require('read-excel-file/node')


const getByEmailId = async (email, token, email_id) => {
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

const getLatestReviewerId = async (email) => {

    try {
        createLogs("info", "getLatestReviewerId", "Reviewer", email, "", "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('reviewer_details');
        const reviewer = await pool.request()
            .query(sql_queries.getReviewerId);
        const result = reviewer.recordset;
        elapsedTime(start, "getLatestgetLatestReviewerIdUserId", "Reviewer");
        return result[0].mgr_id;
    } catch (error) {
        createLogs("error", "getLatestReviewerId", "Reviewer", email, "", error.message);
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
        const temp_file = reviewer_file.file_name;
        const file_name = reviewer_file.file_name.name;
        const dir_path = 'temp/reviewer';
        await file.upload_local(temp_file, file_name, dir_path, email);
        var latest_reviewer_id = await getLatestReviewerId(email);
        var reviewer_count = parseInt(latest_reviewer_id.substring(2));
        var current_date = new Date();
        var is_active = "Y";
        var last_updated_by = email;
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('reviewer_details');
        var rows = await readXlsxFile(dir_path + '/' + file_name);

        for (var i = 1; i < rows.length; i++) {
            reviewer_count = reviewer_count + 1;
            latest_reviewer_id = "M_" + reviewer_count;
            await pool.request()
                .input('mgr_id', sql.NVarChar, latest_reviewer_id)
                .input('control_manager', sql.NVarChar, rows[i][0])
                .input('control_manager_email_id', sql.NVarChar, rows[i][1])                
                .input('created_by', sql.NVarChar, last_updated_by)
                .input('created_date', sql.SmallDateTime, current_date)                
                .input('last_updated_date', sql.SmallDateTime, current_date)
                .input('is_active', sql.NVarChar, is_active)
                .query(sql_queries.createReviewer);
        }
        await file.delete_local(file_name, dir_path, email);
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
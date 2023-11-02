'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const file = require('../../_helpers/file');
const validateToken = require('../../_helpers/validateToken');
const xl = require('excel4node');
const readXlsxFile = require('read-excel-file/node')


const getByEmailId = async (email, token, email_id) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getByEmailId", "User", email, email_id, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('owner_details');
        const user = await pool.request()
            .input('email', sql.NVarChar, email_id)
            .query(sql_queries.userDetailsByEmail);
        const result = user.recordset;
        elapsedTime(start, "getByEmailId", "User");
        return result[0];
    } catch (error) {
        createLogs("error", "getByEmailId", "User", email, email_id, error.message);
        throw error;
    }
}

const getLatestUserId = async (email) => {

    try {
        createLogs("info", "getLatestUserId", "User", email, "", "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('owner_details');
        const user = await pool.request()
            .query(sql_queries.getUserId);
        const result = user.recordset;
        elapsedTime(start, "getLatestUserId", "User");
        return result[0].user_id;
    } catch (error) {
        createLogs("error", "getLatestUserId", "User", email, "", error.message);
        throw error;
    }
}

const getOwnerByFunctionAndTeam = async (email, token, functions, team) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getOwnerByFunctionAndTeam", "Owner", email, functions, "");
        var start = new Date();
        var temp = {};
        temp.file_name = "Owner.xlsx";
        temp.content = "data:application/vnd.ms-excel;base64,0M8R4KGxGuEAAAAAAAA";
        elapsedTime(start, "getOwnerByFunctionAndTeam", "Owner");
        return temp;
    } catch (error) {
        createLogs("error", "getOwnerByFunctionAndTeam", "Owner", email, functions, error.message);
        throw error;
    }
}

const createOwnerDetails = async (email, token, owner_file) => {
    await validateToken(email, token);
    try {
        createLogs("info", "createOwnerDetails", "Owner", email, "", "");
        var start = new Date();
        const temp_file = owner_file.file_name;
        const file_name = owner_file.file_name.name;
        const dir_path = 'temp/owner';
        await file.upload_local(temp_file, file_name, dir_path, email);
        var latest_user_id = await getLatestUserId(email);
        var user_count = parseInt(latest_user_id.substring(2));
        var current_date = new Date();        
        var is_active = "Y";
        var last_updated_by = email;
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('owner_details');
        var rows = await readXlsxFile(dir_path + '/' + file_name);

        for (var i = 1; i < rows.length; i++) {
            user_count = user_count + 1;
            latest_user_id = "U_" + user_count;
            await pool.request()
                .input('user_id', sql.NVarChar, latest_user_id)
                .input('functions', sql.NVarChar, rows[i][0])
                .input('team', sql.NVarChar, rows[i][1])
                .input('position', sql.NVarChar, rows[i][2])
                .input('control_owner', sql.NVarChar, rows[i][3])
                .input('control_owner_email', sql.NVarChar, rows[i][4])
                .input('created_by', sql.NVarChar, last_updated_by)
                .input('created_date', sql.SmallDateTime, current_date)
                .input('last_updated_by', sql.NVarChar, last_updated_by)
                .input('last_update_date', sql.SmallDateTime, current_date)
                .input('is_active', sql.NVarChar, is_active)
                .query(sql_queries.createUser);
        }
        await file.delete_local(file_name, dir_path, email);
        elapsedTime(start, "createOwnerDetails", "Owner");
        return "Success";

    } catch (error) {
        createLogs("error", "createOwnerDetails", "Owner", email, "", error.message);
        throw error;
    }
}

const updateOwnerDetails = async (email, token, owner_file) => {
    await validateToken(email, token);
    try {
        createLogs("info", "updateOwnerDetails", "Owner", email, "", "");
        var start = new Date();

        elapsedTime(start, "updateOwnerDetails", "Owner");
        return "Success";
    } catch (error) {
        createLogs("error", "updateOwnerDetails", "Owner", email, "", error.message);
        throw error;
    }
}


module.exports = {
    getByEmailId,
    getOwnerByFunctionAndTeam,
    createOwnerDetails,
    updateOwnerDetails
}
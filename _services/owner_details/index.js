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
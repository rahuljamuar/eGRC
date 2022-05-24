'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');
const file = require('../../_helpers/file');


const getMappingByUserCurrentMonth = async (email, token, user_id) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getMappingByUserCurrentMonth", "Mapping", email, user_id, "");
        var start = new Date();
        const execution_month = getCurrentExecutingDate("month");
        const execution_year = getCurrentExecutingDate("year");
        const status = 1;
        const freezed = "N";
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const mapping_list = await pool.request()
            .input('user_id', sql.NVarChar, user_id)
            .input('execution_month', sql.NVarChar, execution_month)
            .input('execution_year', sql.Numeric, execution_year)
            .input('status', sql.Numeric, status)
            .input('freezed', sql.NVarChar, freezed)
            .query(sql_queries.mappingByUserGivenMonth);
        elapsedTime(start, "getMappingByUserCurrentMonth", "Mapping");
        return mapping_list.recordset;
    } catch (error) {
        createLogs("error", "getMappingByUserCurrentMonth", "Mapping", email, user_id, error.message);
        throw error;
    }
}

const getMappingByUserGivenMonth = async (email, token, user_id, month, year) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getMappingByUserGivenMonth", "Mapping", email, user_id + ", " + month + ", " + year, "");
        var start = new Date();
        const status = 1;
        const freezed = "N";
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const mapping_list = await pool.request()
            .input('user_id', sql.NVarChar, user_id)
            .input('execution_month', sql.NVarChar, month)
            .input('execution_year', sql.Numeric, year)
            .input('status', sql.Numeric, status)
            .input('freezed', sql.NVarChar, freezed)
            .query(sql_queries.mappingByUserGivenMonth);
        elapsedTime(start, "getMappingByUserGivenMonth", "Mapping");
        return mapping_list.recordset;
    } catch (error) {
        createLogs("error", "getMappingByUserGivenMonth", "Mapping", email, user_id + ", " + month + ", " + year, error.message);
        throw error;
    }
}

const getMappingForViewOwner = async (email, token, user_id) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getMappingForViewOwner", "Mapping", email, user_id, "");
        var start = new Date();
        const execution_month = getCurrentExecutingDate("month");
        const execution_year = getCurrentExecutingDate("year");
        const freezed = "N";
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const mapping_list = await pool.request()
            .input('user_id', sql.NVarChar, user_id)
            .input('execution_month', sql.NVarChar, execution_month)
            .input('execution_year', sql.Numeric, execution_year)
            .input('freezed', sql.NVarChar, freezed)
            .query(sql_queries.getMappingForViewOwner);
        elapsedTime(start, "getMappingForViewOwner", "Mapping");
        return mapping_list.recordset;
    } catch (error) {
        createLogs("error", "getMappingForViewOwner", "Mapping", email, user_id, error.message);
        throw error;
    }
}

const getMappingForViewReviewer = async (email, token, mgr_id) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getMappingForViewReviewer", "Mapping", email, mgr_id, "");
        var start = new Date();
        const execution_month = getCurrentExecutingDate("month");
        const execution_year = getCurrentExecutingDate("year");
        const freezed = "N";
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const mapping_list = await pool.request()
            .input('mgr_id', sql.NVarChar, mgr_id)
            .input('execution_month', sql.NVarChar, execution_month)
            .input('execution_year', sql.Numeric, execution_year)
            .input('freezed', sql.NVarChar, freezed)
            .query(sql_queries.getMappingForViewReviewer);
        elapsedTime(start, "getMappingForViewReviewer", "Mapping");
        return mapping_list.recordset;
    } catch (error) {
        createLogs("error", "getMappingForViewReviewer", "Mapping", email, mgr_id, error.message);
        throw error;
    }
}

const getMappingByOwnerFilter = async (email, token, user_id, executing_month, executing_year, status, country_id, control) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getMappingByOwnerFilter", "Mapping", email, user_id + ", " + executing_month + ", " + executing_year + ", " + status + ", " + country_id + ", " + control, "");
        var start = new Date();
        const freezed = "N";
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        if (status == "") {
            status = 0;
        }
        if (country_id == "") {
            country_id = 0;
        }

        const mapping_list = await pool.request()
            .input('user_id', sql.NVarChar, user_id)
            .input('executing_month', sql.NVarChar, executing_month)
            .input('executing_year', sql.Numeric, executing_year)
            .input('status', sql.Numeric, status)
            .input('country_id', sql.Numeric, country_id)
            .input('control', sql.NVarChar, control)
            .input('freezed', sql.NVarChar, freezed)
            .query(sql_queries.mappingByOwnerFilter);
        elapsedTime(start, "getMappingByOwnerFilter", "Mapping");
        return mapping_list.recordset;
    } catch (error) {
        createLogs("error", "getMappingByOwnerFilter", "Mapping", email, email, user_id + ", " + executing_month + ", " + executing_year + ", " + status + ", " + country_id + ", " + control, error.message);
        throw error;
    }
}

const getMappingByReviewerFilter = async (email, token, mgr_id, executing_month, executing_year, status, country_id, control) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getMappingByReviewerFilter", "Mapping", email, mgr_id + ", " + executing_month + ", " + executing_year + ", " + status + ", " + country_id + ", " + control, "");
        var start = new Date();
        const freezed = "N";
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        if (status == "") {
            status = 0;
        }
        if (country_id == "") {
            country_id = 0;
        }

        const mapping_list = await pool.request()
            .input('mgr_id', sql.NVarChar, mgr_id)
            .input('executing_month', sql.NVarChar, executing_month)
            .input('executing_year', sql.Numeric, executing_year)
            .input('status', sql.Numeric, status)
            .input('country_id', sql.Numeric, country_id)
            .input('control', sql.NVarChar, control)
            .input('freezed', sql.NVarChar, freezed)
            .query(sql_queries.mappingByReviewerFilter);
        elapsedTime(start, "getMappingByReviewerFilter", "Mapping");
        return mapping_list.recordset;
    } catch (error) {
        createLogs("error", "getMappingByReviewerFilter", "Mapping", email, email, mgr_id + ", " + executing_month + ", " + executing_year + ", " + status + ", " + country_id + ", " + control, error.message);
        throw error;
    }
}


const getMappingByAdminFilter = async (email, token, executing_month, executing_year, country_id, control, process, status) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getMappingByAdminFilter", "Mapping", email, executing_month + ", " + executing_year + ", " + country_id + ", " + control + ", " + process + ", " + status, "");
        var start = new Date();
        const freezed = "N";
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        if (executing_year == "") {
            executing_year = 0;
        }
        if (status == "") {
            status = 0;
        }
        if (country_id == "") {
            country_id = 0;
        }

        const mapping_list = await pool.request()
            .input('executing_month', sql.NVarChar, executing_month)
            .input('executing_year', sql.Numeric, executing_year)
            .input('country_id', sql.Numeric, country_id)
            .input('control', sql.NVarChar, control)
            .input('process', sql.NVarChar, process)
            .input('status', sql.Numeric, status)
            .input('freezed', sql.NVarChar, freezed)
            .query(sql_queries.mappingByAdminFilter);
        elapsedTime(start, "getMappingByAdminFilter", "Mapping");
        return mapping_list.recordset;
    } catch (error) {
        createLogs("error", "getMappingByAdminFilter", "Mapping", email, email, executing_month + ", " + executing_year + ", " + country_id + ", " + control + ", " + process + ", " + status, error.message);
        throw error;
    }
}

const updateMappingStatus = async (email, token, mapping_id, status, last_updated_date, last_updated_by, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }
    try {
        createLogs("info", "updateMappingStatus", "Mapping", email, mapping_id + ", " + status, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const update = await pool.request()
            .input('mapping_id', sql.Numeric, mapping_id)
            .input('status', sql.Numeric, status)            
            .input('last_updated_date', sql.SmallDateTime, last_updated_date)
            .input('last_updated_by', sql.NVarChar, last_updated_by)
            .query(sql_queries.updateMappingStatus);
        elapsedTime(start, "updateMappingStatus", "Mapping");
        return update.recordset;
    } catch (error) {
        createLogs("error", "updateMappingStatus", "Mapping", email, mapping_id + ", " + status, error.message);
        throw error;
    }
}

const updateMappingHomogeneousStatus = async (email, token, mapping_id, submitted_homo, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }
    try {
        createLogs("info", "updateMappingHomogeneousStatus", "Mapping", email, mapping_id + ", " + submitted_homo, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const update = await pool.request()
            .input('mapping_id', sql.Numeric, mapping_id)           
            .input('submitted_homo', sql.Bit, submitted_homo)           
            .query(sql_queries.updateMappingHomogeneousStatus);
        elapsedTime(start, "updateMappingHomogeneousStatus", "Mapping");
        return update.recordset;
    } catch (error) {
        createLogs("error", "updateMappingHomogeneousStatus", "Mapping", email, mapping_id + ", " + submitted_homo, error.message);
        throw error;
    }
}


const updateMappingFreeze = async (email, token, mapping_id, freeze, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }
    try {
        createLogs("info", "updateMappingFreeze", "Mapping", email, mapping_id + ", " + freeze, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const update = await pool.request()
            .input('mapping_id', sql.Numeric, mapping_id)
            .input('freeze', sql.NVarChar, freeze)
            .query(sql_queries.updateMappingFreeze);
        const updated_transaction = await getMappingByMappingId(email, token, mapping_id, false)
        elapsedTime(start, "updateMappingFreeze", "Mapping");
        return updated_transaction;
    } catch (error) {
        createLogs("error", "updateMappingFreeze", "Mapping", email, mapping_id + ", " + freeze, error.message);
        throw error;
    }
}

const updateMultipleMappingFreeze = async (email, token, mapping_list, freeze, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }
    try {
        createLogs("info", "updateMultipleMappingFreeze", "Mapping", email, mapping_list + ", " + freeze, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        var updated_transactions = [];
        for (var i = 0; i < mapping_list.length; i++) {
            await pool.request()
                .input('mapping_id', sql.Numeric, mapping_list[i])
                .input('freeze', sql.NVarChar, freeze)
                .query(sql_queries.updateMappingFreeze);
            const updated_transaction = await getMappingByMappingId(email, token, mapping_list[i], false);
            updated_transactions.push(updated_transaction);
        }
        elapsedTime(start, "updateMultipleMappingFreeze", "Mapping");
        return updated_transactions;
    } catch (error) {
        createLogs("error", "updateMultipleMappingFreeze", "Mapping", email, mapping_list + ", " + freeze, error.message);
        throw error;
    }
}


const resetMapping = async (email, token) => {
    await validateToken(email, token);
    try {
        createLogs("info", "resetMapping", "Mapping", email, "", "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        await pool.request()
            .query(sql_queries.reset);

        elapsedTime(start, "resetMapping", "Mapping");
        return "Reset Successful";
    } catch (error) {
        createLogs("error", "resetMapping", "Mapping", email, "", error.message);
        throw error;
    }
}

const getMappingByMappingId = async (email, token, mapping_id, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }

    try {
        createLogs("info", "getMappingByMappingId", "Mapping", email, mapping_id, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const transaction = await pool.request()
            .input('mapping_id', sql.Numeric, mapping_id)
            .query(sql_queries.mappingByMappingId);
        elapsedTime(start, "getMappingByMappingId", "Mapping");
        const result = transaction.recordset;
        return result[0];
    } catch (error) {
        createLogs("error", "getMappingByMappingId", "Mapping", email, mapping_id, error.message);
        throw error;
    }
}

function getCurrentExecutingDate(param) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var today = new Date();
    if (param == "month") {
        if (months[today.getMonth()] == "Jan") {
            return "Dec";
        } else {
            return months[today.getMonth() - 1];
        }

    } else {
        if (months[today.getMonth()] == "Jan") {
            return today.getFullYear() - 1;
        } else {
            return today.getFullYear();
        }

    }
}

module.exports = {
    getMappingByUserCurrentMonth,
    getMappingByUserGivenMonth,
    getMappingForViewOwner,
    getMappingByOwnerFilter,
    getMappingForViewReviewer,
    getMappingByReviewerFilter,
    getMappingByAdminFilter,
    getMappingByMappingId,
    resetMapping,
    updateMappingStatus,
    updateMappingHomogeneousStatus,
    updateMappingFreeze,
    updateMultipleMappingFreeze
}
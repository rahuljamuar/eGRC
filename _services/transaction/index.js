'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const trigger_details = require('../trigger_details');
const mapping_service = require('../mapping');
const validateToken = require('../../_helpers/validateToken');
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');



const getByMappingId = async (email, token, mapping_id, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }

    try {
        createLogs("info", "getByMappingId", "Transaction", email, mapping_id, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('transaction');
        const transaction = await pool.request()
            .input('mapping_id', sql.Numeric, mapping_id)
            .query(sql_queries.transactionByMappingId);
        elapsedTime(start, "getByMappingId", "Transaction");
        return transaction.recordset;
    } catch (error) {
        return error.message;
    }
}

const createTransaction = async (email, token, transaction_data) => {
    await validateToken(email, token);
    try {
        createLogs("info", "createTransaction", "Transaction", email, "", "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('transaction');
        const mapping_count = await pool.request()
            .input('mapping_id', sql.Numeric, transaction_data[0].mapping_id)
            .query(sql_queries.checkMappingIdExist);
        var result = mapping_count.recordset;
        if (result[0].Total > 0) {
            throw new Error("Mapping ID " + transaction_data[0].mapping_id + " already exists in transaction.")
        }
        for (var i = 0; i < transaction_data.length; i++) {
            await pool.request()
                .input('mapping_id', sql.Numeric, transaction_data[i].mapping_id)
                .input('country_id', sql.Numeric, transaction_data[i].country_id)
                .input('user_id', sql.NVarChar, transaction_data[i].user_id)
                .input('control_id', sql.NVarChar, transaction_data[i].control_id)
                .input('task_no', sql.NVarChar, transaction_data[i].task_no)
                .input('response_no', sql.NVarChar, transaction_data[i].response_no)
                .input('response_description', sql.NVarChar, transaction_data[i].response_description)
                .input('control_owner_response_comment', sql.NVarChar, transaction_data[i].control_owner_response_comment)
                .input('mgr_id', sql.NVarChar, transaction_data[i].mgr_id)
                .input('response_date', sql.SmallDateTime, transaction_data[i].response_date)
                .input('executing_month', sql.NVarChar, transaction_data[i].executing_month)
                .input('executing_year', sql.NVarChar, transaction_data[i].executing_year)
                .input('last_updated_by', sql.NVarChar, transaction_data[i].last_updated_by)
                .input('last_updated_date', sql.SmallDateTime, transaction_data[i].last_updated_date)
                .input('is_deleted', sql.NVarChar, "N")
                .query(sql_queries.createTransaction);

        }
        await mapping_service.updateMappingStatus(email, token, transaction_data[0].mapping_id, 3);
        await trigger_details.updateResponseDate(email, token, transaction_data[0].mapping_id, transaction_data[0].response_date, false);
        const updated_transaction = await getByMappingId(email, token, transaction_data[0].mapping_id, false);
        elapsedTime(start, "createTransaction", "Transaction");
        return updated_transaction;
    } catch (error) {
        throw error;
    }
}

const updateTransaction = async (email, token, transaction_data) => {
    await validateToken(email, token);
    try {
        createLogs("info", "updateTransaction", "Transaction", email, "", "");
        var start = new Date();
        for (var i = 0; i < transaction_data.length; i++) {
            const pool = await poolPromise;
            const sql_queries = await utils.loadSqlQueries('transaction');
            await pool.request()
                .input('transaction_id', sql.Numeric, transaction_data[i].transaction_id)
                .input('response_description', sql.NVarChar, transaction_data[i].response_description)
                .input('control_owner_response_comment', sql.NVarChar, transaction_data[i].control_owner_response_comment)
                .input('last_updated_by', sql.NVarChar, transaction_data[i].last_updated_by)
                .input('last_updated_date', sql.SmallDateTime, transaction_data[i].last_updated_date)
                .query(sql_queries.updateTransaction);

        }
        await mapping_service.updateMappingStatus(email, token, transaction_data[0].mapping_id, 3);
        const updated_transaction = await getByMappingId(email, token, transaction_data[0].mapping_id)
        elapsedTime(start, "updateTransaction", "Transaction");
        return updated_transaction;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getByMappingId,
    createTransaction,
    updateTransaction
}
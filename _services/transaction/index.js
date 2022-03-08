'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const trigger_details = require('../trigger_details');
const mapping_service = require('../mapping');
const logger = require('../../_helpers/logger');
const validateToken = require('../../_helpers/validateToken');
const { exitOnError } = require('../../_helpers/logger');


const getControlDetails = async () => {
    try {
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('control_details');
        const control_details_list = await pool.request().query(sql_queries.controlDetailsList);
        return control_details_list.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async (control_details_id) => {
    try {
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('control_details');
        const control_details = await pool.request()
            .input('control_id', sql.NVarChar, control_details_id)
            .query(sql_queries.controlDetailsById);
        return control_details.recordset;
    } catch (error) {
        return error.message;
    }
}

const getByMappingId = async (email, token, mapping_id, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }

    try {
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('transaction');
        const transaction = await pool.request()
            .input('mapping_id', sql.Numeric, mapping_id)
            .query(sql_queries.transactionByMappingId);
        return transaction.recordset;
    } catch (error) {
        return error.message;
    }
}

const createTransaction = async (email, token, transaction_data) => {
    await validateToken(email, token);
    try {
        logger.info("Inserting data in transaction ");
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('transaction');
        const mapping_count = await pool.request()
            .input('mapping_id', sql.Numeric, transaction_data[0].mapping_id)
            .query(sql_queries.checkMappingIdExist);
        var result = mapping_count.recordset;
        if(result[0].Total > 0){
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
        await mapping_service.updateMappingStatus(transaction_data[0].mapping_id, 3);
        await trigger_details.updateResponseDate(transaction_data[0].mapping_id, transaction_data[0].response_date);
        const updated_transaction = await getByMappingId(email, token, transaction_data[0].mapping_id);
        return updated_transaction;
    } catch (error) {
        throw error;
    }
}

const updateTransaction = async (email, token, transaction_data) => {
    await validateToken(email, token);
    try {
        logger.info("Updating data in transaction ");

        for (var i = 0; i < transaction_data.length; i++) {
            const pool = await poolPromise;
            const sql_queries = await utils.loadSqlQueries('transaction');
            const transaction = await pool.request()
                .input('transaction_id', sql.Numeric, transaction_data[i].transaction_id)
                .input('response_description', sql.NVarChar, transaction_data[i].response_description)
                .input('control_owner_response_comment', sql.NVarChar, transaction_data[i].control_owner_response_comment)
                .input('last_updated_by', sql.NVarChar, transaction_data[i].last_updated_by)
                .input('last_updated_date', sql.SmallDateTime, transaction_data[i].last_updated_date)
                .query(sql_queries.updateTransaction);

        }
        await mapping_service.updateMappingStatus(transaction_data[0].mapping_id, 3);
        const updated_transaction = await getByMappingId(email, token, transaction_data[0].mapping_id)
        return updated_transaction;
    } catch (error) {
        return error.message;
    }
}

const updateControlDetails = async (control_details_id, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sql_queries = await utils.loadSqlQueries('control_details');
        const update = await pool.request()
            .input('control_details_id', sql.Int, control_details_id)
            .input('eventTitle', sql.NVarChar(100), data.eventTitle)
            .input('eventDescription', sql.NVarChar(1500), data.eventDescription)
            .input('startDate', sql.Date, data.startDate)
            .input('endDate', sql.Date, data.endDate)
            .input('avenue', sql.NVarChar(200), data.avenue)
            .input('maxMembers', sql.Int, data.maxMembers)
            .query(sql_queries.updateControlDetails);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteControlDetails = async (control_details_id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sql_queries = await utils.loadSqlQueries('control_details');
        const deleteControlDetails = await pool.request()
            .input('control_details_id', sql.Int, control_details_id)
            .query(sql_queries.deleteControlDetails);
        return deleteControlDetails.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getControlDetails,
    getById,
    getByMappingId,
    createTransaction,
    updateTransaction,
    updateControlDetails,
    deleteControlDetails
}
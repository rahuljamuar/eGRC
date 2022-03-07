'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const logger = require('../../_helpers/logger');
const validateToken = require('../../_helpers/validateToken');

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

const getByEmailId = async(email, token, email_id) => {
    await validateToken(email, token);
    try {
        logger.info("Get user details for email id " + email_id);
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('user_details');        
        const user = await pool.request()
                            .input('email', sql.NVarChar, email_id)
                            .query(sql_queries.userDetailsByEmail);
        const result = user.recordset;
        return result[0];
    } catch (error) {
        return error.message;
    }
}

const createControlDetails = async (control_details_data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sql_queries = await utils.loadSqlQueries('control_details');
        const insert_control_details = await pool.request()
                            .input('Control_id', sql.NVarChar(100), control_details_data.Control_id)
                            .input('eventDescription', sql.NVarChar(1500), control_details_data.eventDescription)
                            .input('startDate', sql.Date, control_details_data.startDate)
                            .input('endDate', sql.Date, control_details_data.endDate)
                            .input('avenue', sql.NVarChar(200), control_details_data.avenue)
                            .input('maxMembers', sql.Int, control_details_data.maxMembers)
                            .query(sql_queries.createControlDetails);                            
        return insert_control_details.recordset;
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
    getByEmailId,
    createControlDetails,
    updateControlDetails,
    deleteControlDetails
}
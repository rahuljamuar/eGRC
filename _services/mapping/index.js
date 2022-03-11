'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const logger = require('../../_helpers/logger');
const validateToken = require('../../_helpers/validateToken');



const getMapping = async () => {
    try {
        logger.info("Get All Mapping");
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const mapping_list = await pool.request().query(sql_queries.mappingList);
        return mapping_list.recordset;
    } catch (error) {
        console.log(error.message);
    }
}


const getMappingByUserCurrentMonth = async (email, token, user_id) => {
    await validateToken(email, token);
    try {
        logger.info("Get All Mapping By User ID " + user_id);
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
        return mapping_list.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getMappingByOwnerFilter = async (email, token, user_id, executing_month, executing_year, status, country_id, control) => {
    await validateToken(email, token);
    try {
        logger.info("Get All Mapping By Owner Filter " + user_id);  
        const freezed = "N";      
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');

        const mapping_list = await pool.request()
            .input('user_id', sql.NVarChar, user_id)
            .input('executing_month', sql.NVarChar, executing_month)
            .input('executing_year', sql.Numeric, executing_year)
            .input('status', sql.Numeric, status)
            .input('country_id', sql.Numeric, country_id)
            .input('control', sql.NVarChar, control)
            .input('freezed', sql.NVarChar, freezed)
            .query(sql_queries.mappingByOwnerFilter);
        return mapping_list.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const updateMappingStatus = async (mapping_id, status) => {
    try {
        logger.info("Update Mapping Status for Mapping ID " + mapping_id);
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const update = await pool.request()
            .input('mapping_id', sql.Numeric, mapping_id)
            .input('status', sql.Numeric, status)            
            .query(sql_queries.updateMappingStatus);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}



const getMappingByUserGivenMonth = async (email, token, user_id, month, year) => {
    await validateToken(email, token);
    try {
        logger.info("Get All Mapping By User ID, Month, Year " + user_id);
       
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
        return mapping_list.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async (mapping_id) => {
    try {
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const mapping = await pool.request()
            .input('control_id', sql.NVarChar, mapping_id)
            .query(sql_queries.MappingById);
        return mapping.recordset;
    } catch (error) {
        return error.message;
    }
}

const createMapping = async (mapping_data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sql_queries = await utils.loadSqlQueries('mapping');
        const insert_mapping = await pool.request()
            .input('Control_id', sql.NVarChar(100), mapping_data.Control_id)
            .input('eventDescription', sql.NVarChar(1500), mapping_data.eventDescription)
            .input('startDate', sql.Date, mapping_data.startDate)
            .input('endDate', sql.Date, mapping_data.endDate)
            .input('avenue', sql.NVarChar(200), mapping_data.avenue)
            .input('maxMembers', sql.Int, mapping_data.maxMembers)
            .query(sql_queries.createMapping);
        return insert_mapping.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteMapping = async (mapping_id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sql_queries = await utils.loadSqlQueries('mapping');
        const deleteMapping = await pool.request()
            .input('mapping_id', sql.Int, mapping_id)
            .query(sql_queries.deleteMapping);
        return deleteMapping.recordset;
    } catch (error) {
        return error.message;
    }
}

function getCurrentExecutingDate(param) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var today = new Date();
    if (param == "month") {
        if(months[today.getMonth()] == "Jan"){
            return "Dec";
        }else{
            return months[today.getMonth() - 1];
        }
        
    } else {
        if(months[today.getMonth()] == "Jan"){
            return today.getFullYear() - 1;
        }else{
            return today.getFullYear();
        }
        
    }
}

const resetMapping = async (email, token) => {
    await validateToken(email, token);
    try {
        logger.info("Reset Mapping request by " + email);
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');
        const reset = await pool.request()                
            .query(sql_queries.reset);
        return reset.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getMapping,
    getById,
    getMappingByUserCurrentMonth,
    getMappingByUserGivenMonth,
    getMappingByOwnerFilter,
    createMapping,
    resetMapping,
    updateMappingStatus,
    deleteMapping
}
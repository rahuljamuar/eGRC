'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
// const sql = require('mssql');


const getMapping = async () => {
    try {                   
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');        
        const mapping_list = await pool.request().query(sql_queries.mappingList);        
        return mapping_list.recordset;
    } catch (error) {
        console.log(error.message);
    }
}


const getMappingByUserCurrentMonth = async () => {
    try {                   
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('mapping');        
        const mapping_list = await pool.request().query(sql_queries.mappingByUserCurrentMonth);        
        return mapping_list.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(mapping_id) => {
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

const updateMapping = async (mapping_id, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sql_queries = await utils.loadSqlQueries('mapping');
        const update = await pool.request()
                        .input('mapping_id', sql.Int, mapping_id)
                        .input('eventTitle', sql.NVarChar(100), data.eventTitle)
                        .input('eventDescription', sql.NVarChar(1500), data.eventDescription)
                        .input('startDate', sql.Date, data.startDate)
                        .input('endDate', sql.Date, data.endDate)
                        .input('avenue', sql.NVarChar(200), data.avenue)
                        .input('maxMembers', sql.Int, data.maxMembers)
                        .query(sql_queries.updateMapping);
        return update.recordset;
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

module.exports = {
    getMapping,
    getById,
    createMapping,
    updateMapping,
    deleteMapping
}
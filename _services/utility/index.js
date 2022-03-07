'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const logger = require('../../_helpers/logger');
// const sql = require('mssql');




const getOwnerDropdown = async (user_id) => {
    try {
        logger.info("Getting owner dropdown for user id " + user_id);
        var drop_down = {};
        // const status = ["New", "In Approval", "Complete"];
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('utility');
        var status = await pool.request()
            .input('user_id', sql.NVarChar, user_id)            
            .query(sql_queries.statusForControlOwner);
        var country = await pool.request()
            .input('user_id', sql.NVarChar, user_id)
            .query(sql_queries.ownerDistinctCountry);
        var control = await pool.request()
            .input('user_id', sql.NVarChar, user_id)
            .query(sql_queries.ownerDistinctControl);

        // var result_status = JSON.stringify(status.recordset);;
        // var temp_id_status = result_status.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        // var id_status = JSON.parse(temp_id_status);

        // var statuses = [];
        // for (var i = 0; i < id_status.length; i++) {
        //     statuses.push(id_status[i].status_desc)
        // }
        drop_down.status = status.recordset;

        var result_control = JSON.stringify(control.recordset);;
        var temp_id_control = result_control.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        var id_control = JSON.parse(temp_id_control);
        var controls = [];
        for (var i = 0; i < id_control.length; i++) {
            controls.push(id_control[i].control)
        }
        drop_down.control = controls;
        drop_down.country = country.recordset;

        return drop_down;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getOwnerDropdown
}
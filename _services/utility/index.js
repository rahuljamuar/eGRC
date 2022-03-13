'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');


const getOwnerDropdown = async (email, token, user_id) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getOwnerDropdown", "Utility", email, user_id, "");
        var start = new Date();
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
        elapsedTime(start, "getOwnerDropdown", "Utility");
        return drop_down;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getOwnerDropdown
}
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
        createLogs("error", "getOwnerDropdown", "Utility", email, user_id, error.message);
        throw error;
    }
}

const getReviewerDropdown = async (email, token, mgr_id) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getReviewerDropdown", "Utility", email, mgr_id, "");
        var start = new Date();
        var drop_down = {};
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('utility');
        var status = await pool.request()
            .input('mgr_id', sql.NVarChar, mgr_id)
            .query(sql_queries.statusForControlReviewer);
        var country = await pool.request()
            .input('mgr_id', sql.NVarChar, mgr_id)
            .query(sql_queries.reviewerDistinctCountry);
        var control = await pool.request()
            .input('mgr_id', sql.NVarChar, mgr_id)
            .query(sql_queries.reviewerDistinctControl);

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
        elapsedTime(start, "getReviewerDropdown", "Utility");
        return drop_down;
    } catch (error) {
        createLogs("error", "getReviewerDropdown", "Utility", email, mgr_id, error.message);
        throw error;
    }
}

const getAdminDropdown = async (email, token) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getAdminDropdown", "Utility", email, "", "");
        var start = new Date();
        var drop_down = {};
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('utility');
        var status = await pool.request()            
            .query(sql_queries.statusForAdmin);
        var country = await pool.request()            
            .query(sql_queries.adminDistinctCountry);
        var control = await pool.request()            
            .query(sql_queries.adminDistinctControl);
        var process = await pool.request()           
            .query(sql_queries.adminDistinctProcess);

        

        var result_control = JSON.stringify(control.recordset);;
        var temp_id_control = result_control.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        var id_control = JSON.parse(temp_id_control);
        var controls = [];
        for (var i = 0; i < id_control.length; i++) {
            controls.push(id_control[i].control)
        }

        var result_process = JSON.stringify(process.recordset);;
        var temp_id_process = result_process.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        var id_process = JSON.parse(temp_id_process);
        var processes = [];
        for (var i = 0; i < id_process.length; i++) {
            processes.push(id_process[i].process)
        }

        drop_down.country = country.recordset;
        drop_down.control = controls;
        drop_down.status = status.recordset;
        drop_down.process = processes;
        
        elapsedTime(start, "getAdminDropdown", "Utility");
        return drop_down;
    } catch (error) {
        createLogs("error", "getAdminDropdown", "Utility", email, "", error.message);
        throw error;
    }
}

module.exports = {
    getOwnerDropdown,
    getReviewerDropdown,
    getAdminDropdown
}
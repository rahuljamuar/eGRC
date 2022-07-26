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


const controlUpdateDropdown = async (email, token) => {
    await validateToken(email, token);
    try {
        createLogs("info", "controlUpdateDropdown", "Utility", email, "", "");
        var start = new Date();
        var drop_down = {};
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('utility');
        var control = await pool.request()            
            .query(sql_queries.distinctControl);
        var performance_location = await pool.request()            
            .query(sql_queries.distinctPerformanceLocation);
        

        

        var result_control = JSON.stringify(control.recordset);;
        var temp_id_control = result_control.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        var id_control = JSON.parse(temp_id_control);
        var controls = [];
        for (var i = 0; i < id_control.length; i++) {
            controls.push(id_control[i].control)
        }

        var result_performance_location = JSON.stringify(performance_location.recordset);;
        var temp_id_performance_location = result_performance_location.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        var id_performance_location = JSON.parse(temp_id_performance_location);
        var performance_locations = [];
        for (var i = 0; i < id_performance_location.length; i++) {
            performance_locations.push(id_performance_location[i].performance_locations)
        }
        
        drop_down.control = controls;        
        drop_down.process = performance_locations;
        
        elapsedTime(start, "controlUpdateDropdown", "Utility");
        console.log(drop_down);
        return drop_down;
    } catch (error) {
        createLogs("error", "controlUpdateDropdown", "Utility", email, "", error.message);
        throw error;
    }
}

const countryUpdateDropdown = async (email, token) => {
    await validateToken(email, token);
    try {
        createLogs("info", "countryUpdateDropdown", "Utility", email, "", "");
        var start = new Date();
        var drop_down = {};
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('utility');
        var country = await pool.request()            
            .query(sql_queries.distinctCountry);
        var mco = await pool.request()            
            .query(sql_queries.distinctMCO);
        

        

        var result_mco = JSON.stringify(mco.recordset);;
        var temp_id_mco = result_mco.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        var id_mco = JSON.parse(temp_id_mco);
        var mcos = [];
        for (var i = 0; i < id_mco.length; i++) {
            mcos.push(id_mco[i].mco)
        }
       
        
        drop_down.country = country.recordset;;        
        drop_down.mco = mcos;
        
        elapsedTime(start, "countryUpdateDropdown", "Utility");
        console.log(drop_down);
        return drop_down;
    } catch (error) {
        createLogs("error", "countryUpdateDropdown", "Utility", email, "", error.message);
        throw error;
    }
}

const questionUpdateDropdown = async (email, token) => {
    await validateToken(email, token);
    try {
        createLogs("info", "questionUpdateDropdown", "Utility", email, "", "");
        var start = new Date();
        var drop_down = {};
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('utility');
        var setno = await pool.request()            
            .query(sql_queries.distinctSet);
        var theme = await pool.request()            
            .query(sql_queries.distinctTheme);
        

        

        var result_setno = JSON.stringify(setno.recordset);;
        var temp_id_setno = result_setno.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        var id_setno = JSON.parse(temp_id_setno);
        var setnos = [];
        for (var i = 0; i < id_setno.length; i++) {
            setnos.push(id_setno[i].setno)
        }

        var result_theme = JSON.stringify(theme.recordset);;
        var temp_id_theme = result_theme.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        var id_theme = JSON.parse(temp_id_theme);
        var themes = [];
        for (var i = 0; i < id_theme.length; i++) {
            themes.push(id_theme[i].theme)
        }
        
        drop_down.theme = themes;
        drop_down.set = setnos;
        
        elapsedTime(start, "questionUpdateDropdown", "Utility");
        console.log(drop_down);
        return drop_down;
    } catch (error) {
        createLogs("error", "questionUpdateDropdown", "Utility", email, "", error.message);
        throw error;
    }
}


const ownerUpdateDropdown = async (email, token) => {
    await validateToken(email, token);
    try {
        createLogs("info", "ownerUpdateDropdown", "Utility", email, "", "");
        var start = new Date();
        var drop_down = {};
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('utility');
        var functions = await pool.request()            
            .query(sql_queries.distinctFunction);
        var team = await pool.request()            
            .query(sql_queries.distinctTeam);
        

        

        var result_functions = JSON.stringify(functions.recordset);;
        var temp_id_functions = result_functions.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        var id_functions = JSON.parse(temp_id_functions);
        var functions_list = [];
        for (var i = 0; i < id_functions.length; i++) {
            functions_list.push(id_functions[i].functions)
        }

        var result_team = JSON.stringify(team.recordset);;
        var temp_id_team = result_team.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
        var id_team = JSON.parse(temp_id_team);
        var teams = [];
        for (var i = 0; i < id_team.length; i++) {
            teams.push(id_team[i].team)
        }
        
        drop_down.functions = functions_list;
        drop_down.team = teams;
        
        elapsedTime(start, "ownerUpdateDropdown", "Utility");
        console.log(drop_down);
        return drop_down;
    } catch (error) {
        createLogs("error", "ownerUpdateDropdown", "Utility", email, "", error.message);
        throw error;
    }
}

const reviewerUpdateDropdown = async (email, token) => {
    await validateToken(email, token);
    try {
        createLogs("info", "reviewerUpdateDropdown", "Utility", email, "", "");
        var start = new Date();
        var drop_down = {};
        
        var status = [];
        var status_obj = {};
        status_obj.status_code = "Y";
        status_obj.status_value = "Active";
        status.push(status_obj);
        status_obj = {};
        status_obj.status_code = "N";
        status_obj.status_value = "In-Active";
        status.push(status_obj);

        
        
        drop_down.status = status;
        
        
        elapsedTime(start, "reviewerUpdateDropdown", "Utility");
        console.log(drop_down);
        return drop_down;
    } catch (error) {
        createLogs("error", "reviewerUpdateDropdown", "Utility", email, "", error.message);
        throw error;
    }
}

module.exports = {
    getOwnerDropdown,
    getReviewerDropdown,
    getAdminDropdown,
    controlUpdateDropdown,
    countryUpdateDropdown,
    questionUpdateDropdown,
    ownerUpdateDropdown,
    reviewerUpdateDropdown
}
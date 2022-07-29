'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');


const getControlByControlAndPL = async (email, token, control, performance_location) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getControlByControlAndPL", "Control", email, control, "");
        var start = new Date();
        var temp = {};
        temp.file_name = "Control.xlsx";
        temp.content = "data:application/vnd.ms-excel;base64,0M8R4KGxGuEAAAAAAAA";
        elapsedTime(start, "getControlByControlAndPL", "Control");
        return temp;
    } catch (error) {
        createLogs("error", "getControlByControlAndPL", "Control", email, control, error.message);
        throw error;
    }
}

const createControlDetails = async (email, token, control_file) => {
    await validateToken(email, token);
    try {
        createLogs("info", "createControlDetails", "Control", email, "", "");
        var start = new Date();
       
        elapsedTime(start, "createControlDetails", "Control");
        return "Success";
    } catch (error) {
        createLogs("error", "createControlDetails", "Control", email, "", error.message);
        throw error;
    }
}

const updateControlDetails = async (email, token, control_file) => {
    await validateToken(email, token);
    try {
        createLogs("info", "updateControlDetails", "Control", email, "", "");
        var start = new Date();
       
        elapsedTime(start, "updateControlDetails", "Control");
        return "Success";
    } catch (error) {
        createLogs("error", "updateControlDetails", "Control", email, "", error.message);
        throw error;
    }
}


module.exports = {
    getControlByControlAndPL,    
    createControlDetails,
    updateControlDetails
}
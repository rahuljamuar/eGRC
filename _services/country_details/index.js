'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');


const getCountryByCountryAndMCO = async (email, token, country, mco) => {
    await validateToken(email, token);
    try {
        createLogs("info", "getCountryByCountryAndMCO", "Country", email, country, "");
        var start = new Date();
        var temp = {};
        temp.file_name = "Country.xlsx";
        temp.content = "data:application/vnd.ms-excel;base64,0M8R4KGxGuEAAAAAAAA";
        elapsedTime(start, "getCountryByCountryAndMCO", "Country");
        return temp;
    } catch (error) {
        createLogs("error", "getCountryByCountryAndMCO", "Country", email, country, error.message);
        throw error;
    }
}

const createCountryDetails = async (email, token, country_file) => {
    await validateToken(email, token);
    try {
        createLogs("info", "createCountryDetails", "Country", email, "", "");
        var start = new Date();
       
        elapsedTime(start, "createCountryDetails", "Country");
        return "Success";
    } catch (error) {
        createLogs("error", "createCountryDetails", "Country", email, "", error.message);
        throw error;
    }
}

const updateCountryDetails = async (email, token, country_file) => {
    await validateToken(email, token);
    try {
        createLogs("info", "updateCountryDetails", "Country", email, "", "");
        var start = new Date();
       
        elapsedTime(start, "updateCountryDetails", "Country");
        return "Success";
    } catch (error) {
        createLogs("error", "updateCountryDetails", "Country", email, "", error.message);
        throw error;
    }
}


module.exports = {
    getCountryByCountryAndMCO,    
    createCountryDetails,
    updateCountryDetails
}
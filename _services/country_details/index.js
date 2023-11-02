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
        const temp_file = country_file.file_name;
        const file_name = country_file.file_name.name;
        const dir_path = 'temp/country';
        await file.upload_local(temp_file, file_name, dir_path, email);
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('country_details');
        var rows = await readXlsxFile(dir_path + '/' + file_name);

        for (var i = 1; i < rows.length; i++) {
            user_count = user_count + 1;
            latest_user_id = "U_" + user_count;
            await pool.request()
                .input('country_id', sql.NVarChar, latest_user_id)
                .input('country_name', sql.NVarChar, rows[i][0])
                .input('bu', sql.NVarChar, rows[i][1])
                .input('mco', sql.NVarChar, rows[i][2])
                .input('cluster', sql.NVarChar, rows[i][3])
                .input('active', sql.NVarChar, rows[i][4])                
                .query(sql_queries.createCountry);
        }
        await file.delete_local(file_name, dir_path, email);
       
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
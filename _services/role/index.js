'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');


const getRoles = async (email, token, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }
    try {
        createLogs("info", "getRoles", "Role", email, "", "");
        var start = new Date();
        var roles = [];
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('role');
        var owner_role = await pool.request()
            .input('email_id', sql.NVarChar, email)
            .query(sql_queries.ownerRole);
        owner_role = owner_role.recordset[0].role_count;
        if (owner_role > 0) {
            roles.push("Owner");
        }
        var reviewer_role = await pool.request()
            .input('email_id', sql.NVarChar, email)
            .query(sql_queries.reviewerRole);
        reviewer_role = reviewer_role.recordset[0].role_count;
        if (reviewer_role > 0) {
            roles.push("Reviewer");
        }
        var admin_role = await pool.request()
            .input('email_id', sql.NVarChar, email)
            .query(sql_queries.adminRole);
            admin_role = admin_role.recordset[0].role_count;
        if (admin_role > 0) {
            roles.push("Admin");
        }
        elapsedTime(start, "getRoles", "Role");
        return roles;
    } catch (error) {
        createLogs("error", "getRoles", "Role", email, "", error.message);
        throw error;
    }
}





module.exports = {
    getRoles
}
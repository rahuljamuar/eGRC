'use strict';
const utils = require('../utils');
const { poolPromise, sql } = require('../../_helpers/db')
const createLogs = require('../../_helpers/createLogs');
const file = require('../../_helpers/file');
const elapsedTime = require('../../_helpers/elapsedTime');
const validateToken = require('../../_helpers/validateToken');


const getFilesByMappingID = async (email, token, mapping_id, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }
    try {
        createLogs("info", "getFilesByMappingID", "File", email, mapping_id, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('file');
        const mapping_list = await pool.request()
            .input('mapping_id', sql.NVarChar, mapping_id)
            .query(sql_queries.filesByMappingID);
        elapsedTime(start, "getFilesByMappingID", "File");
        return mapping_list.recordset;
    } catch (error) {
        createLogs("error", "getFilesByMappingID", "File", email, user_id, error.message);
        throw error;
    }
}

const createFile = async (email, token, files, file_param, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }
    try {
        createLogs("info", "createFile", "File", email, "", "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('file');
        for (var i = 0; i < files.file_name.length; i++) {
            const file_upload = await file.uploadFile(files.file_name[i], file_param.file_path)
            // console.log(file_upload)
            await pool.request()
                .input('mapping_id', sql.Numeric, file_param.mapping_id)
                .input('file_name', sql.NVarChar, file_upload.file_name)
                .input('file_path', sql.NVarChar, file_param.file_path)
                .input('mime_type', sql.NVarChar, file_upload.mime_type)
                .input('uploaded_on', sql.SmallDateTime, file_param.uploaded_on)
                .input('uploaded_by', sql.NVarChar, file_param.uploaded_by)
                .query(sql_queries.createFile);
        }
        const file_list = await getFilesByMappingID(email, token, file_param.mapping_id, false);
        elapsedTime(start, "createFile", "File");
        return file_list;
    } catch (error) {
        createLogs("error", "createFile", "File", email, "", error.message);
        throw error;
    }
}

const downloadFile = async (email, token, link_id, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }
    try {
        createLogs("info", "downloadFile", "File", email, link_id, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('file');
        const link_query = await pool.request()
            .input('link_id', sql.Numeric, link_id)           
            .query(sql_queries.fileByLinkID);
        const link_data = link_query.recordset;
        const file_download = await file.downloadFile(link_data[0].file_name, link_data[0].file_path, link_data[0].mime_type);
        elapsedTime(start, "downloadFile", "File");
        return file_download;
    } catch (error) {
        createLogs("error", "downloadFile", "File", email, link_id, error.message);
        throw error;
    }
}

const deleteFile = async (email, token, link_id, validate_token = true) => {
    if (validate_token) {
        await validateToken(email, token);
    }
    try {
        createLogs("info", "deleteFile", "File", email, link_id, "");
        var start = new Date();
        const pool = await poolPromise;
        const sql_queries = await utils.loadSqlQueries('file');
        const link_query = await pool.request()
            .input('link_id', sql.Numeric, link_id)           
            .query(sql_queries.fileByLinkID);
        const link_data = link_query.recordset;
        await file.deleteFile(link_data[0].file_name, link_data[0].file_path);
        await pool.request()
            .input('link_id', sql.Numeric, link_id)           
            .query(sql_queries.deleteFileByLinkID);
        const file_list = await getFilesByMappingID(email, token, link_data[0].mapping_id, false);
        elapsedTime(start, "deleteFile", "File");
        return file_list;
    } catch (error) {
        createLogs("error", "deleteFile", "File", email, link_id, error.message);
        throw error;
    }
}



module.exports = {
    createFile,
    downloadFile,
    deleteFile,
    getFilesByMappingID
}
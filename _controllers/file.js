'use strict';

const file_service = require('../_services/file');
const createLogs = require('../_helpers/createLogs');

const createFile = async (req, res, next) => {
    // createLogs("info", "createFileController", "File", req.files, req.body, "");
    file_service.createFile(req.headers.email, req.headers.token, req.files, req.body)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}

const downloadFile = async (req, res, next) => {
    file_service.downloadFile(req.headers.email, req.headers.token, req.query.link_id)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}

const listAllFiles = async (req, res, next) => {
    file_service.listAllFiles(req.headers.email, req.headers.token)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}

const getFilesByMappingID = async (req, res, next) => {
    file_service.getFilesByMappingID(req.headers.email, req.headers.token, req.query.mapping_id)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}

const deleteFile = async (req, res, next) => {
    file_service.deleteFile(req.headers.email, req.headers.token, req.query.link_id)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}

const createContainer = async (req, res, next) => {
    file_service.createContainer(req.headers.email, req.headers.token)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}

const deleteContainer = async (req, res, next) => {
    file_service.deleteContainer(req.headers.email, req.headers.token)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}




module.exports = {
    createFile,
    downloadFile,
    deleteFile,
    listAllFiles,
    getFilesByMappingID,
    createContainer,
    deleteContainer
}
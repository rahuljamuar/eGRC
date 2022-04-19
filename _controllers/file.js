'use strict';

const file_service = require('../_services/file');

const createFile = async (req, res, next) => {   
    file_service.createFile(req.headers.email, req.headers.token, req.files, req.body)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}

const downloadFile = async (req, res, next) => {
    file_service.downloadFile(req.headers.email, req.headers.token, req.query.link_id)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}

const listFiles = async (req, res, next) => {
    file_service.listFiles(req.headers.email, req.headers.token)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}

const deleteFile = async (req, res, next) => {
    file_service.deleteFile(req.headers.email, req.headers.token, req.query.link_id)
        .then(files => files ? res.json(files) : res.sendStatus(404))
        .catch(err => next(err));
}




module.exports = {
    createFile,
    downloadFile,
    deleteFile,
    listFiles
}
'use strict';

const express = require('express');
const file_controller = require('../_controllers/file');
const router = express.Router();


// router.get('/', file_controller.listAllFiles);
router.get('/mapping/', file_controller.getFilesByMappingID);
router.post('/upload/', file_controller.createFile);
router.post('/container/', file_controller.createContainer);
router.get('/download/', file_controller.downloadFile);
router.delete('/delete/', file_controller.deleteFile);
router.delete('/container/', file_controller.deleteContainer);


module.exports = {
    routes: router
}
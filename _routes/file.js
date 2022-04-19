'use strict';

const express = require('express');
const file_controller = require('../_controllers/file');
const router = express.Router();


router.get('/', file_controller.listFiles);
router.post('/upload/', file_controller.createFile);
router.get('/download/', file_controller.downloadFile);
router.delete('/delete/', file_controller.deleteFile);


module.exports = {
    routes: router
}
'use strict';

const express = require('express');
const mapping_controller = require('../_controllers/mapping');
const router = express.Router();

router.get('/mapping', mapping_controller.getAllMapping);
router.get('/mapping/:id', mapping_controller.getMapping);
router.post('/mapping', mapping_controller.addMapping);
router.put('/mapping/:id', mapping_controller.updateMapping);
router.delete('/mapping/:id', mapping_controller.deleteMapping);


module.exports = {
    routes: router
}
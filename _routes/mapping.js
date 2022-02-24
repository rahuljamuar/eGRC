'use strict';

const express = require('express');
const mapping_controller = require('../_controllers/mapping');
const router = express.Router();

router.get('/', mapping_controller.getAllMapping);
// router.get('/:id', mapping_controller.getMapping);
router.get('/current/', mapping_controller.getMappingByUserCurrentMonth);
router.get('/given/', mapping_controller.getMappingByUserGivenMonth);
// router.post('/', mapping_controller.addMapping);
// router.put('/:id', mapping_controller.updateMapping);
// router.delete('/mapping/:id', mapping_controller.deleteMapping);


module.exports = {
    routes: router
}
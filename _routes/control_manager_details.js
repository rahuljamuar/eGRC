'use strict';

const express = require('express');
const control_manager_details_controller = require('../_controllers/control_manager_details');
const router = express.Router();

router.get('/control_manager_details', control_manager_details_controller.getAllControlManagerDetails);
router.get('/control_manager_details/:id', control_manager_details_controller.getControlManagerDetails);
router.post('/control_manager_details', control_manager_details_controller.addControlManagerDetails);
router.put('/control_manager_details/:id', control_manager_details_controller.updateControlManagerDetails);
router.delete('/control_manager_details/:id', control_manager_details_controller.deleteControlManagerDetails);


module.exports = {
    routes: router
}
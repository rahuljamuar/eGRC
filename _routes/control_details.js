'use strict';

const express = require('express');
const control_details_controller = require('../_controllers/control_details');
const router = express.Router();

router.get('/control_details/', control_details_controller.getControlByControlAndPL);
router.post('/control_details/', control_details_controller.createControlDetails);
router.put('/control_details/', control_details_controller.updateControlDetails);



module.exports = {
    routes: router
}
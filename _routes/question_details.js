'use strict';

const express = require('express');
const question_details_controller = require('../_controllers/question_details');
const router = express.Router();

// router.get('/control_details', control_details_controller.getAllControlDetails);
// router.get('/control_details/:id', control_details_controller.getControlDetails);
router.get('/setno/', question_details_controller.getBySetNo);
// router.post('/control_details', control_details_controller.addControlDetails);
// router.put('/control_details/:id', control_details_controller.updateControlDetails);
// router.delete('/control_details/:id', control_details_controller.deleteControlDetails);


module.exports = {
    routes: router
}
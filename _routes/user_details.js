'use strict';

const express = require('express');
const user_details_controller = require('../_controllers/user_details');
const router = express.Router();

router.get('/user_details/', user_details_controller.getByEmailId);
// router.get('/control_details/:id', control_details_controller.getControlDetails);
// router.post('/control_details', control_details_controller.addControlDetails);
// router.put('/control_details/:id', control_details_controller.updateControlDetails);
// router.delete('/control_details/:id', control_details_controller.deleteControlDetails);


module.exports = {
    routes: router
}
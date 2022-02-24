'use strict';

const express = require('express');
const share_link_controller = require('../_controllers/share_link');
const router = express.Router();

router.get('/mapping_id/', share_link_controller.getByMappingId);
// router.get('/control_details/:id', control_details_controller.getControlDetails);
// router.post('/control_details', control_details_controller.addControlDetails);
// router.put('/control_details/:id', control_details_controller.updateControlDetails);
// router.delete('/control_details/:id', control_details_controller.deleteControlDetails);


module.exports = {
    routes: router
}
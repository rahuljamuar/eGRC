'use strict';

const express = require('express');
const transaction_controller = require('../_controllers/transaction');
const router = express.Router();

// router.get('/control_details', control_details_controller.getAllControlDetails);
// router.get('/control_details/:id', control_details_controller.getControlDetails);
router.post('/', transaction_controller.createTransaction);
// router.put('/control_details/:id', control_details_controller.updateControlDetails);
// router.delete('/control_details/:id', control_details_controller.deleteControlDetails);


module.exports = {
    routes: router
}
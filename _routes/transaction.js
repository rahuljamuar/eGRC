'use strict';

const express = require('express');
const transaction_controller = require('../_controllers/transaction');
const router = express.Router();

// router.get('/control_details', control_details_controller.getAllControlDetails);
router.get('/mapping_id/', transaction_controller.getByMappingId);
router.post('/', transaction_controller.createTransaction);
router.put('/', transaction_controller.updateTransaction);
// router.delete('/control_details/:id', control_details_controller.deleteControlDetails);


module.exports = {
    routes: router
}
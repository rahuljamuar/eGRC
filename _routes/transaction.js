'use strict';

const express = require('express');
const transaction_controller = require('../_controllers/transaction');
const router = express.Router();


router.get('/mapping_id/', transaction_controller.getByMappingId);
router.post('/', transaction_controller.createTransaction);
router.put('/owner/', transaction_controller.updateTransactionByOwner);
router.put('/reviewer/', transaction_controller.updateTransactionByReviewer);
router.put('/admin/', transaction_controller.updateTransactionByAdmin);


module.exports = {
    routes: router
}
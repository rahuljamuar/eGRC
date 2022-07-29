'use strict';

const express = require('express');
const reviewer_details_controller = require('../_controllers/reviewer_details');
const router = express.Router();

router.get('/reviewer_details/', reviewer_details_controller.getByEmailId);
router.get('/reviewer_details/admin/', reviewer_details_controller.getReviewerByStatus);
router.post('/reviewer_details/', reviewer_details_controller.createReviewerDetails);
router.put('/reviewer_details/', reviewer_details_controller.updateReviewerDetails);


module.exports = {
    routes: router
}
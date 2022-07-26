'use strict';

const express = require('express');
const utility_controller = require('../_controllers/utility');
const router = express.Router();


router.get('/owner_dropdown/', utility_controller.getOwnerDropdown);
router.get('/reviewer_dropdown/', utility_controller.getReviewerDropdown);
router.get('/admin_dropdown/', utility_controller.getAdminDropdown);
router.get('/control_dropdown/', utility_controller.controlUpdateDropdown);
router.get('/country_dropdown/', utility_controller.countryUpdateDropdown);
router.get('/question_dropdown/', utility_controller.questionUpdateDropdown);
router.get('/owner_update_dropdown/', utility_controller.ownerUpdateDropdown);
router.get('/reviewer_update_dropdown/', utility_controller.reviewerUpdateDropdown);

    
module.exports = {
    routes: router
}
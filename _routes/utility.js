'use strict';

const express = require('express');
const utility_controller = require('../_controllers/utility');
const router = express.Router();


router.get('/owner_dropdown/', utility_controller.getOwnerDropdown);
router.get('/reviewer_dropdown/', utility_controller.getReviewerDropdown);
router.get('/admin_dropdown/', utility_controller.getAdminDropdown);



module.exports = {
    routes: router
}
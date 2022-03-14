'use strict';

const express = require('express');
const reviewer_details_controller = require('../_controllers/reviewer_details');
const router = express.Router();

router.get('/reviewer_details/', reviewer_details_controller.getByEmailId);


module.exports = {
    routes: router
}
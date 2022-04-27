'use strict';

const express = require('express');
const admin_details_controller = require('../_controllers/admin_details');
const router = express.Router();

router.get('/admin_details/', admin_details_controller.getByEmailId);


module.exports = {
    routes: router
}
'use strict';

const express = require('express');
const user_details_controller = require('../_controllers/user_details');
const router = express.Router();

router.get('/user_details/', user_details_controller.getByEmailId);


module.exports = {
    routes: router
}
'use strict';

const express = require('express');
const utility_controller = require('../_controllers/utility');
const router = express.Router();


router.get('/owner_dropdown/', utility_controller.getOwnerDropdown);



module.exports = {
    routes: router
}
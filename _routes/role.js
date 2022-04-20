'use strict';

const express = require('express');
const role_controller = require('../_controllers/role');
const router = express.Router();


router.get('/', role_controller.getRoles);


module.exports = {
    routes: router
}
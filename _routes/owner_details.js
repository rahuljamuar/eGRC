'use strict';

const express = require('express');
const owner_details_controller = require('../_controllers/owner_details');
const router = express.Router();

router.get('/user_details/', owner_details_controller.getByEmailId);
router.get('/owner_details/admin/', owner_details_controller.getOwnerByFunctionAndTeam);
router.post('/owner_details/', owner_details_controller.createOwnerDetails);
router.put('/owner_details/', owner_details_controller.updateOwnerDetails);


module.exports = {
    routes: router
}
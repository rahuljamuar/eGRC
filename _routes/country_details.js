'use strict';

const express = require('express');
const country_details_controller = require('../_controllers/country_details');
const router = express.Router();

router.get('/country_details/', country_details_controller.getCountryByCountryAndMCO);
router.post('/country_details/', country_details_controller.createCountryDetails);
router.put('/country_details/', country_details_controller.updateCountryDetails);



module.exports = {
    routes: router
}
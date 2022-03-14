'use strict';

const express = require('express');
const mapping_controller = require('../_controllers/mapping');
const router = express.Router();


router.get('/current/', mapping_controller.getMappingByUserCurrentMonth);
router.get('/given/', mapping_controller.getMappingByUserGivenMonth);
router.get('/owner_view/', mapping_controller.getMappingForViewOwner);
router.get('/reviewer_view/', mapping_controller.getMappingForViewReviewer);
router.get('/owner_filter/', mapping_controller.getMappingByOwnerFilter);
router.get('/reviewer_filter/', mapping_controller.getMappingByReviewerFilter);
router.delete('/reset/', mapping_controller.resetMapping);


module.exports = {
    routes: router
}
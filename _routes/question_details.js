'use strict';

const express = require('express');
const question_details_controller = require('../_controllers/question_details');
const router = express.Router();


router.get('/setno/', question_details_controller.getBySetNo);
router.get('/question_details/', question_details_controller.getQuestionBySetAndTheme);
router.post('/question_details/', question_details_controller.createQuestionDetails);
router.put('/question_details/', question_details_controller.updateQuestionDetails);


module.exports = {
    routes: router
}
'use strict';

const question_details_service = require('../_services/question_details');

const getBySetNo = async (req, res, next) => {    
    question_details_service.getBySetNo(req.headers.email, req.headers.token, req.query.set_no)
        .then(questions => questions ? res.json(questions) : res.sendStatus(404))
        .catch(err => next(err));

}

const getQuestionBySetAndTheme = async (req, res, next) => {    
    question_details_service.getQuestionBySetAndTheme(req.headers.email, req.headers.token, req.query.set, req.query.theme)
        .then(question_details => question_details ? res.json(question_details) : res.sendStatus(404))
        .catch(err => next(err));
}

const createQuestionDetails = async (req, res, next) => {    
    question_details_service.createQuestionDetails(req.headers.email, req.headers.token, req.files)
        .then(question_details => question_details ? res.json(question_details) : res.sendStatus(404))
        .catch(err => next(err));
}

const updateQuestionDetails = async (req, res, next) => {    
    question_details_service.updateQuestionDetails(req.headers.email, req.headers.token, req.files)
        .then(question_details => question_details ? res.json(question_details) : res.sendStatus(404))
        .catch(err => next(err));
}



module.exports = {
    getBySetNo,
    getQuestionBySetAndTheme,
    createQuestionDetails,
    updateQuestionDetails
}
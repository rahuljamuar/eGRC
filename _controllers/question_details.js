'use strict';

const question_details_service = require('../_services/question_details');

const getAllQuestionDetails = async (req, res, next) => {
    try {
        const question_details_list = await question_details_service.getQuestionDetails();
        res.send(question_details_list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getQuestionDetails = async (req, res, next) => {
    try {
        const question_details_id = req.params.id;
        const question_details = await question_details_service.getById(question_details_id);
        res.send(question_details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBySetNo = async (req, res, next) => {

    const set_no = req.query.set_no;
    question_details_service.getBySetNo(req.headers.email, req.headers.token, set_no)
        .then(questions => questions ? res.json(questions) : res.sendStatus(404))
        .catch(err => next(err));

}

const addQuestionDetails = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await question_details_service.creatQuestionDetails(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateQuestionDetails = async (req, res, next) => {
    try {
        const question_details_id = req.params.id;
        const data = req.body;
        const updated = await question_details_service.updateQuestionDetails(question_details_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteQuestionDetails = async (req, res, next) => {
    try {
        const question_details_id = req.params.id;
        const deletedQuestionDetails = await question_details_service.deleteQuestionDetails(question_details_id);
        res.send(deletedQuestionDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllQuestionDetails,
    getQuestionDetails,
    getBySetNo,
    addQuestionDetails,
    updateQuestionDetails,
    deleteQuestionDetails
}
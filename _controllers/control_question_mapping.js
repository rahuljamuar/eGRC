'use strict';

const control_question_mapping_data = require('../_services/control_question_mapping');

const getAllControlQuestionMapping = async (req, res, next) => {
    try {        
        const control_question_mapping_list = await control_question_mapping_data.getControlQuestionMapping();
        res.send(control_question_mapping_list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getControlQuestionMapping = async (req, res, next) => {
    try {
        const control_question_mapping_id = req.params.id;
        const control_question_mapping = await control_question_mapping_data.getById(control_question_mapping_id);
        res.send(control_question_mapping);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addControlQuestionMapping = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await control_question_mapping_data.creatControlQuestionMapping(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateControlQuestionMapping = async (req, res, next) => {
    try {
        const control_question_mapping_id =  req.params.id;
        const data = req.body;
        const updated = await control_question_mapping_data.updateControlQuestionMapping(control_question_mapping_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteControlQuestionMapping = async (req, res, next) => {
    try {
        const control_question_mapping_id = req.params.id;
        const deletedControlQuestionMapping = await control_question_mapping_data.deleteControlQuestionMapping(control_question_mapping_id);
        res.send(deletedControlQuestionMapping);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllControlQuestionMapping,
    getControlQuestionMapping,
    addControlQuestionMapping,
    updateControlQuestionMapping,
    deleteControlQuestionMapping
}
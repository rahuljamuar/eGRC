'use strict';

const trigger_details_data = require('../_services/trigger_details');

const getAllTriggerDetails = async (req, res, next) => {
    try {        
        const trigger_details_list = await trigger_details_data.getTriggerDetails();
        res.send(trigger_details_list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTriggerDetails = async (req, res, next) => {
    try {
        const trigger_details_id = req.params.id;
        const trigger_details = await trigger_details_data.getById(trigger_details_id);
        res.send(trigger_details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addTriggerDetails = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await trigger_details_data.creatTriggerDetails(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTriggerDetails = async (req, res, next) => {
    try {
        const trigger_details_id =  req.params.id;
        const data = req.body;
        const updated = await trigger_details_data.updateTriggerDetails(trigger_details_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTriggerDetails = async (req, res, next) => {
    try {
        const trigger_details_id = req.params.id;
        const deletedTriggerDetails = await trigger_details_data.deleteTriggerDetails(trigger_details_id);
        res.send(deletedTriggerDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllTriggerDetails,
    getTriggerDetails,
    addTriggerDetails,
    updateTriggerDetails,
    deleteTriggerDetails
}
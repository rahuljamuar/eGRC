'use strict';

const control_details_data = require('../_services/control_details');

const getAllControlDetails = async (req, res, next) => {
    try {        
        const control_details_list = await control_details_data.getControlDetails();
        res.send(control_details_list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getControlDetails = async (req, res, next) => {
    try {
        const control_details_id = req.params.id;
        const control_details = await control_details_data.getById(control_details_id);
        res.send(control_details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addControlDetails = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await control_details_data.creatControlDetails(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateControlDetails = async (req, res, next) => {
    try {
        const control_details_id =  req.params.id;
        const data = req.body;
        const updated = await control_details_data.updateControlDetails(control_details_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteControlDetails = async (req, res, next) => {
    try {
        const control_details_id = req.params.id;
        const deletedControlDetails = await control_details_data.deleteControlDetails(control_details_id);
        res.send(deletedControlDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllControlDetails,
    getControlDetails,
    addControlDetails,
    updateControlDetails,
    deleteControlDetails
}
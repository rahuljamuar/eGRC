'use strict';

const control_manager_details_data = require('../_services/control_manager_details');

const getAllControlManagerDetails = async (req, res, next) => {
    try {        
        const control_manager_details_list = await control_manager_details_data.getControlManagerDetails();
        res.send(control_manager_details_list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getControlManagerDetails = async (req, res, next) => {
    try {
        const control_manager_details_id = req.params.id;
        const control_manager_details = await control_manager_details_data.getById(control_manager_details_id);
        res.send(control_manager_details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addControlManagerDetails = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await control_manager_details_data.creatControlManagerDetails(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateControlManagerDetails = async (req, res, next) => {
    try {
        const control_manager_details_id =  req.params.id;
        const data = req.body;
        const updated = await control_manager_details_data.updateControlManagerDetails(control_manager_details_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteControlManagerDetails = async (req, res, next) => {
    try {
        const control_manager_details_id = req.params.id;
        const deletedControlManagerDetails = await control_manager_details_data.deleteControlManagerDetails(control_manager_details_id);
        res.send(deletedControlManagerDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllControlManagerDetails,
    getControlManagerDetails,
    addControlManagerDetails,
    updateControlManagerDetails,
    deleteControlManagerDetails
}
'use strict';

const master_details_data = require('../_services/master_details');

const getAllMasterDetails = async (req, res, next) => {
    try {        
        const master_details_list = await master_details_data.getMasterDetails();
        res.send(master_details_list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMasterDetails = async (req, res, next) => {
    try {
        const master_details_id = req.params.id;
        const master_details = await master_details_data.getById(master_details_id);
        res.send(master_details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addMasterDetails = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await master_details_data.creatMasterDetails(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMasterDetails = async (req, res, next) => {
    try {
        const master_details_id =  req.params.id;
        const data = req.body;
        const updated = await master_details_data.updateMasterDetails(master_details_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMasterDetails = async (req, res, next) => {
    try {
        const master_details_id = req.params.id;
        const deletedMasterDetails = await master_details_data.deleteMasterDetails(master_details_id);
        res.send(deletedMasterDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllMasterDetails,
    getMasterDetails,
    addMasterDetails,
    updateMasterDetails,
    deleteMasterDetails
}
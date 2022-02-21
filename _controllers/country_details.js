'use strict';

const country_details_data = require('../_services/country_details');

const getAllCountryDetails = async (req, res, next) => {
    try {        
        const country_details_list = await country_details_data.getCountryDetails();
        res.send(country_details_list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCountryDetails = async (req, res, next) => {
    try {
        const country_details_id = req.params.id;
        const country_details = await country_details_data.getById(country_details_id);
        res.send(country_details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addCountryDetails = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await country_details_data.creatCountryDetails(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCountryDetails = async (req, res, next) => {
    try {
        const country_details_id =  req.params.id;
        const data = req.body;
        const updated = await country_details_data.updateCountryDetails(country_details_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCountryDetails = async (req, res, next) => {
    try {
        const country_details_id = req.params.id;
        const deletedCountryDetails = await country_details_data.deleteCountryDetails(country_details_id);
        res.send(deletedCountryDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllCountryDetails,
    getCountryDetails,
    addCountryDetails,
    updateCountryDetails,
    deleteCountryDetails
}
'use strict';

const mapping_data = require('../_services/mapping');

const getAllMapping = async (req, res, next) => {
    try {        
        const mapping_list = await mapping_data.getMapping();        
        res.send(mapping_list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMapping = async (req, res, next) => {
    try {
        const mapping_id = req.params.id;
        const mapping = await mapping_data.getById(mapping_id);
        res.send(mapping);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMappingByUserCurrentMonth = async (req, res, next) => {
    try {        
        const user_id = req.query.user_id;        
        const mapping = await mapping_data.getMappingByUserCurrentMonth(user_id);
        res.send(mapping);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMappingByUserGivenMonth = async (req, res, next) => {
    try {        
        const user_id = req.query.user_id;
        const month = req.query.month;
        const year = req.query.year;        
        const mapping = await mapping_data.getMappingByUserGivenMonth(user_id, month, year);
        res.send(mapping);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMappingByOwnerFilter = async (req, res, next) => {
    try {        
        const user_id = req.query.user_id;
        const month = req.query.month;
        const year = req.query.year;   
        const status = req.query.status;
        const country_id = req.query.country_id;        
        const control = req.query.control;        
        const mapping = await mapping_data.getMappingByOwnerFilter(user_id, month, year, status, country_id, control);
        res.send(mapping);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addMapping = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await mapping_data.creatMapping(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMapping = async (req, res, next) => {
    try {
        const mapping_id =  req.params.id;
        const data = req.body;
        const updated = await mapping_data.updateMapping(mapping_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMapping = async (req, res, next) => {
    try {
        const mapping_id = req.params.id;
        const deletedMapping = await mapping_data.deleteMapping(mapping_id);
        res.send(deletedMapping);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllMapping,
    getMapping,
    getMappingByUserCurrentMonth,
    getMappingByUserGivenMonth,
    getMappingByOwnerFilter,
    addMapping,
    updateMapping,
    deleteMapping
}
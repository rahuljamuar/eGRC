'use strict';

const mapping_data = require('../_services/mapping');

const getAllMapping = async (req, res, next) => {
    try {        
        const mapping_list = await mapping_data.getMapping();
        console.log("IN get mapping")
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
    addMapping,
    updateMapping,
    deleteMapping
}
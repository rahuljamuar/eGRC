'use strict';

const mapping_service = require('../_services/mapping');

const getAllMapping = async (req, res, next) => {
    try {
        const mapping_list = await mapping_service.getMapping();
        res.send(mapping_list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMapping = async (req, res, next) => {
    try {
        const mapping_id = req.params.id;
        const mapping = await mapping_service.getById(mapping_id);
        res.send(mapping);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMappingByUserCurrentMonth = async (req, res, next) => {
    const user_id = req.query.user_id;
    mapping_service.getMappingByUserCurrentMonth(req.headers.email, req.headers.token, user_id)
        .then(mapping => mapping ? res.json(mapping) : res.sendStatus(404))
        .catch(err => next(err));
}


const getMappingByUserGivenMonth = async (req, res, next) => {

    const user_id = req.query.user_id;
    const month = req.query.month;
    const year = req.query.year;
    mapping_service.getMappingByUserGivenMonth(req.headers.email, req.headers.token, user_id, month, year)
        .then(mapping => mapping ? res.json(mapping) : res.sendStatus(404))
        .catch(err => next(err));

}

const getMappingByOwnerFilter = async (req, res, next) => {

    const user_id = req.query.user_id;
    const month = req.query.month;
    const year = req.query.year;
    const status = req.query.status;
    const country_id = req.query.country_id;
    const control = req.query.control;
    mapping_service.getMappingByOwnerFilter(req.headers.email, req.headers.token, user_id, month, year, status, country_id, control)
        .then(mapping => mapping ? res.json(mapping) : res.sendStatus(404))
        .catch(err => next(err));

}

const addMapping = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await mapping_service.creatMapping(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMapping = async (req, res, next) => {
    try {
        const mapping_id = req.params.id;
        const data = req.body;
        const updated = await mapping_service.updateMapping(mapping_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMapping = async (req, res, next) => {
    try {
        const mapping_id = req.params.id;
        const deletedMapping = await mapping_service.deleteMapping(mapping_id);
        res.send(deletedMapping);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const resetMapping = async (req, res, next) => {
    
    mapping_service.resetMapping(req.headers.email, req.headers.token)
        .then(mapping => mapping ? res.json(mapping) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports = {
    getAllMapping,
    getMapping,
    getMappingByUserCurrentMonth,
    getMappingByUserGivenMonth,
    getMappingByOwnerFilter,
    addMapping,
    updateMapping,
    deleteMapping,
    resetMapping
}
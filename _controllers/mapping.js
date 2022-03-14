'use strict';

const mapping_service = require('../_services/mapping');

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

const getMappingForViewOwner = async (req, res, next) => {
    const user_id = req.query.user_id;
    mapping_service.getMappingForViewOwner(req.headers.email, req.headers.token, user_id)
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

const getMappingByReviewerFilter = async (req, res, next) => {

    const mgr_id = req.query.mgr_id;
    const month = req.query.month;
    const year = req.query.year;
    const status = req.query.status;
    const country_id = req.query.country_id;
    const control = req.query.control;
    mapping_service.getMappingByReviewerFilter(req.headers.email, req.headers.token, mgr_id, month, year, status, country_id, control)
        .then(mapping => mapping ? res.json(mapping) : res.sendStatus(404))
        .catch(err => next(err));

}

const getMappingForViewReviewer = async (req, res, next) => {
    const mgr_id = req.query.mgr_id;
    mapping_service.getMappingForViewReviewer(req.headers.email, req.headers.token, mgr_id)
        .then(mapping => mapping ? res.json(mapping) : res.sendStatus(404))
        .catch(err => next(err));
}

const resetMapping = async (req, res, next) => {
    
    mapping_service.resetMapping(req.headers.email, req.headers.token)
        .then(mapping => mapping ? res.json(mapping) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports = {
    getMappingByUserCurrentMonth,
    getMappingByUserGivenMonth,
    getMappingForViewOwner,
    getMappingByOwnerFilter,
    getMappingForViewReviewer,
    getMappingByReviewerFilter,
    resetMapping
}
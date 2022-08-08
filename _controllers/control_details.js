'use strict';

const control_details_service = require('../_services/control_details');

const getControlByControlAndPL = async (req, res, next) => {    
    control_details_service.getControlByControlAndPL(req.headers.email, req.headers.token, req.query.control, req.query.performance_location)
        .then(control_details => control_details ? res.json(control_details) : res.sendStatus(404))
        .catch(err => next(err));
}

const createControlDetails = async (req, res, next) => {    
    control_details_service.createControlDetails(req.headers.email, req.headers.token, req.files)
        .then(control_details => control_details ? res.json(control_details) : res.sendStatus(404))
        .catch(err => next(err));
}

const updateControlDetails = async (req, res, next) => {    
    control_details_service.updateControlDetails(req.headers.email, req.headers.token, req.files)
        .then(control_details => control_details ? res.json(control_details) : res.sendStatus(404))
        .catch(err => next(err));
}



module.exports = {
    getControlByControlAndPL,
    createControlDetails,
    updateControlDetails
}
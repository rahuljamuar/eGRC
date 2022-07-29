'use strict';

const owner_details_service = require('../_services/owner_details');

const getByEmailId = async (req, res, next) => {
    
    owner_details_service.getByEmailId(req.headers.email, req.headers.token, req.query.email)
        .then(user_details => user_details ? res.json(user_details) : res.sendStatus(404))
        .catch(err => next(err));

}

const getOwnerByFunctionAndTeam = async (req, res, next) => {    
    owner_details_service.getOwnerByFunctionAndTeam(req.headers.email, req.headers.token, req.query.function, req.query.team)
        .then(owner_details => owner_details ? res.json(owner_details) : res.sendStatus(404))
        .catch(err => next(err));
}

const createOwnerDetails = async (req, res, next) => {    
    owner_details_service.createOwnerDetails(req.headers.email, req.headers.token, req.files)
        .then(owner_details => owner_details ? res.json(owner_details) : res.sendStatus(404))
        .catch(err => next(err));
}

const updateOwnerDetails = async (req, res, next) => {    
    owner_details_service.updateOwnerDetails(req.headers.email, req.headers.token, req.files)
        .then(owner_details => owner_details ? res.json(owner_details) : res.sendStatus(404))
        .catch(err => next(err));
}



module.exports = {
    getByEmailId,
    getOwnerByFunctionAndTeam,
    createOwnerDetails,
    updateOwnerDetails
}
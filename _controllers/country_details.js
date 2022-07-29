'use strict';

const country_details_service = require('../_services/country_details');

const getCountryByCountryAndMCO = async (req, res, next) => {    
    country_details_service.getCountryByCountryAndMCO(req.headers.email, req.headers.token, req.query.country, req.query.mco)
        .then(country_details => country_details ? res.json(country_details) : res.sendStatus(404))
        .catch(err => next(err));
}

const createCountryDetails = async (req, res, next) => {    
    country_details_service.createCountryDetails(req.headers.email, req.headers.token, req.files)
        .then(country_details => country_details ? res.json(country_details) : res.sendStatus(404))
        .catch(err => next(err));
}

const updateCountryDetails = async (req, res, next) => {    
    country_details_service.updateCountryDetails(req.headers.email, req.headers.token, req.files)
        .then(country_details => country_details ? res.json(country_details) : res.sendStatus(404))
        .catch(err => next(err));
}



module.exports = {
    getCountryByCountryAndMCO,
    createCountryDetails,
    updateCountryDetails
}
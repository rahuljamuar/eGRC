'use strict';

const reviewer_details_service = require('../_services/reviewer_details');

const getByEmailId = async (req, res, next) => {
    
    reviewer_details_service.getByEmailId(req.headers.email, req.headers.token, req.query.email)
        .then(reviewer_details => reviewer_details ? res.json(reviewer_details) : res.sendStatus(404))
        .catch(err => next(err));

}



module.exports = {   
    getByEmailId   
}
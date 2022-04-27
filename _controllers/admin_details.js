'use strict';

const admin_details_service = require('../_services/admin_details');

const getByEmailId = async (req, res, next) => {
    
    admin_details_service.getByEmailId(req.headers.email, req.headers.token, req.query.email)
        .then(admin_details => admin_details ? res.json(admin_details) : res.sendStatus(404))
        .catch(err => next(err));

}



module.exports = {   
    getByEmailId   
}
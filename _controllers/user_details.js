'use strict';

const user_details_data = require('../_services/user_details');

const getByEmailId = async (req, res, next) => {
    
    user_details_data.getByEmailId(req.headers.email, req.headers.token, req.query.email)
        .then(user_details => user_details ? res.json(user_details) : res.sendStatus(404))
        .catch(err => next(err));

}



module.exports = {   
    getByEmailId   
}
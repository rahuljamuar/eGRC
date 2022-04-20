'use strict';

const role_service = require('../_services/role');

const getRoles = async (req, res, next) => {   
    role_service.getRoles(req.headers.email, req.headers.token)
        .then(roles => roles ? res.json(roles) : res.sendStatus(404))
        .catch(err => next(err));
}


module.exports = {
    getRoles
}
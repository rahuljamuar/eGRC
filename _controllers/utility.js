'use strict';

const utility_service = require('../_services/utility');


const getOwnerDropdown = async (req, res, next) => {
    const user_id = req.query.user_id;
    utility_service.getOwnerDropdown(req.headers.email, req.headers.token, user_id)
        .then(owner_dropdown => owner_dropdown ? res.json(owner_dropdown) : res.sendStatus(404))
        .catch(err => next(err));

}

module.exports = {
    getOwnerDropdown
}
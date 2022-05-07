'use strict';

const utility_service = require('../_services/utility');


const getOwnerDropdown = async (req, res, next) => {
    const user_id = req.query.user_id;
    utility_service.getOwnerDropdown(req.headers.email, req.headers.token, user_id)
        .then(owner_dropdown => owner_dropdown ? res.json(owner_dropdown) : res.sendStatus(404))
        .catch(err => next(err));

}

const getReviewerDropdown = async (req, res, next) => {
    const mgr_id = req.query.mgr_id;
    utility_service.getReviewerDropdown(req.headers.email, req.headers.token, mgr_id)
        .then(reviewer_dropdown => reviewer_dropdown ? res.json(reviewer_dropdown) : res.sendStatus(404))
        .catch(err => next(err));

}

const getAdminDropdown = async (req, res, next) => {    
    utility_service.getAdminDropdown(req.headers.email, req.headers.token)
        .then(admin_dropdown => admin_dropdown ? res.json(admin_dropdown) : res.sendStatus(404))
        .catch(err => next(err));

}

module.exports = {
    getOwnerDropdown,
    getReviewerDropdown,
    getAdminDropdown
}
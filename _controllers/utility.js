'use strict';

const utility = require('../_services/utility');


const getOwnerDropdown = async (req, res, next) => {
    try {
        const user_id = req.query.user_id;        
        const owner_dropdown = await utility.getOwnerDropdown(user_id);
        res.send(owner_dropdown);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getOwnerDropdown
}
'use strict';

const user_details_data = require('../_services/user_details');

const getAllUserDetails = async (req, res, next) => {
    try {
        const user_details_list = await user_details_data.getUserDetails();
        res.send(user_details_list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getByEmailId = async (req, res, next) => {
    
    user_details_data.getByEmailId(req.headers.email, req.headers.token, req.query.email)
        .then(user_details => user_details ? res.json(user_details) : res.sendStatus(404))
        .catch(err => next(err));

}

const addUserDetails = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await user_details_data.creatUserDetails(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUserDetails = async (req, res, next) => {
    try {
        const user_details_id = req.params.id;
        const data = req.body;
        const updated = await user_details_data.updateUserDetails(user_details_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUserDetails = async (req, res, next) => {
    try {
        const user_details_id = req.params.id;
        const deletedUserDetails = await user_details_data.deleteUserDetails(user_details_id);
        res.send(deletedUserDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllUserDetails,
    getByEmailId,
    addUserDetails,
    updateUserDetails,
    deleteUserDetails
}
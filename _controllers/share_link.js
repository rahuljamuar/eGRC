'use strict';

const share_link_data = require('../_services/share_link');

const getAllShareLink = async (req, res, next) => {
    try {
        const share_link_list = await share_link_data.getShareLink();
        res.send(share_link_list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getShareLink = async (req, res, next) => {
    try {
        const share_link_id = req.params.id;
        const share_link = await share_link_data.getById(share_link_id);
        res.send(share_link);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getByMappingId = async (req, res, next) => {

    const mapping_id = req.query.mapping_id;
    share_link_data.getByMappingId(req.headers.email, req.headers.token, mapping_id)
        .then(share_link => share_link ? res.json(share_link) : res.sendStatus(404))
        .catch(err => next(err));


}

const addShareLink = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await share_link_data.creatShareLink(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateShareLink = async (req, res, next) => {
    try {
        const share_link_id = req.params.id;
        const data = req.body;
        const updated = await share_link_data.updateShareLink(share_link_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteShareLink = async (req, res, next) => {
    try {
        const share_link_id = req.params.id;
        const deletedShareLink = await share_link_data.deleteShareLink(share_link_id);
        res.send(deletedShareLink);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllShareLink,
    getShareLink,
    getByMappingId,
    addShareLink,
    updateShareLink,
    deleteShareLink
}
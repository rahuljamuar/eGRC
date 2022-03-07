'use strict';

const transaction_details_service = require('../_services/transaction');

const getAllTransactionDetails = async (req, res, next) => {
    try {
        const transaction_details_list = await transaction_details_service.getTransactionDetails();
        res.send(transaction_details_list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTransactionDetails = async (req, res, next) => {
    try {
        const transaction_details_id = req.params.id;
        const transaction_details = await transaction_details_service.getById(transaction_details_id);
        res.send(transaction_details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const createTransaction = async (req, res, next) => {

    const data = req.body;
    transaction_details_service.createTransaction(req.headers.email, req.headers.token, data)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(err => next(err));

}

const getByMappingId = async (req, res, next) => {

    const mapping_id = req.query.mapping_id;
    transaction_details_service.getByMappingId(req.headers.email, req.headers.token, mapping_id)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(err => next(err));

}

const updateTransactionDetails = async (req, res, next) => {
    try {
        const transaction_details_id = req.params.id;
        const data = req.body;
        const updated = await transaction_details_service.updateTransactionDetails(transaction_details_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTransactionDetails = async (req, res, next) => {
    try {
        const transaction_details_id = req.params.id;
        const deletedTransactionDetails = await transaction_details_service.deleteTransactionDetails(transaction_details_id);
        res.send(deletedTransactionDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllTransactionDetails,
    getTransactionDetails,
    getByMappingId,
    createTransaction,
    updateTransactionDetails,
    deleteTransactionDetails
}
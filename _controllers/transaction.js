'use strict';

const transaction_details_data = require('../_services/transaction');

const getAllTransactionDetails = async (req, res, next) => {
    try {        
        const transaction_details_list = await transaction_details_data.getTransactionDetails();
        res.send(transaction_details_list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTransactionDetails = async (req, res, next) => {
    try {
        const transaction_details_id = req.params.id;
        const transaction_details = await transaction_details_data.getById(transaction_details_id);
        res.send(transaction_details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const createTransaction = async (req, res, next) => {
    try {
        const data = req.body;
        const ids = await transaction_details_data.createTransaction(data);
        res.send(ids);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTransactionDetails = async (req, res, next) => {
    try {
        const transaction_details_id =  req.params.id;
        const data = req.body;
        const updated = await transaction_details_data.updateTransactionDetails(transaction_details_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTransactionDetails = async (req, res, next) => {
    try {
        const transaction_details_id = req.params.id;
        const deletedTransactionDetails = await transaction_details_data.deleteTransactionDetails(transaction_details_id);
        res.send(deletedTransactionDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllTransactionDetails,
    getTransactionDetails,
    createTransaction,
    updateTransactionDetails,
    deleteTransactionDetails
}
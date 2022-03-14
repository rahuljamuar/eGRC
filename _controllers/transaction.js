'use strict';

const transaction_details_service = require('../_services/transaction');


const createTransaction = async (req, res, next) => {

    const data = req.body;
    transaction_details_service.createTransaction(req.headers.email, req.headers.token, data)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(err => next(err));

}

const updateTransactionByOwner = async (req, res, next) => {

    const data = req.body;
    transaction_details_service.updateTransactionByOwner(req.headers.email, req.headers.token, data)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(err => next(err));

}

const updateTransactionByReviewer = async (req, res, next) => {

    const data = req.body;
    transaction_details_service.updateTransactionByReviewer(req.headers.email, req.headers.token, data)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(err => next(err));

}

const getByMappingId = async (req, res, next) => {

    const mapping_id = req.query.mapping_id;
    transaction_details_service.getByMappingId(req.headers.email, req.headers.token, mapping_id)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(err => next(err));

}



module.exports = {  
    getByMappingId,
    createTransaction,
    updateTransactionByOwner,
    updateTransactionByReviewer
}
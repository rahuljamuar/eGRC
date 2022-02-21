'use strict';

const dashboard_data = require('../_services/dashboard');

const getAllDashboard = async (req, res, next) => {
    try {        
        const dashboard_list = await dashboard_data.getDashboard();
        res.send(dashboard_list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getDashboard = async (req, res, next) => {
    try {
        const dashboard_id = req.params.id;
        const dashboard = await dashboard_data.getById(dashboard_id);
        res.send(dashboard);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addDashboard = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await dashboard_data.creatDashboard(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateDashboard = async (req, res, next) => {
    try {
        const dashboard_id =  req.params.id;
        const data = req.body;
        const updated = await dashboard_data.updateDashboard(dashboard_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteDashboard = async (req, res, next) => {
    try {
        const dashboard_id = req.params.id;
        const deletedDashboard = await dashboard_data.deleteDashboard(dashboard_id);
        res.send(deletedDashboard);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllDashboard,
    getDashboard,
    addDashboard,
    updateDashboard,
    deleteDashboard
}
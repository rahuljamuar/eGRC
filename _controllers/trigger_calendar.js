'use strict';

const trigger_calendar_data = require('../_services/trigger_calendar');

const getAllTriggerCalendar = async (req, res, next) => {
    try {        
        const trigger_calendar_list = await trigger_calendar_data.getTriggerCalendar();
        res.send(trigger_calendar_list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTriggerCalendar = async (req, res, next) => {
    try {
        const trigger_calendar_id = req.params.id;
        const trigger_calendar = await trigger_calendar_data.getById(trigger_calendar_id);
        res.send(trigger_calendar);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addTriggerCalendar = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await trigger_calendar_data.creatTriggerCalendar(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTriggerCalendar = async (req, res, next) => {
    try {
        const trigger_calendar_id =  req.params.id;
        const data = req.body;
        const updated = await trigger_calendar_data.updateTriggerCalendar(trigger_calendar_id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTriggerCalendar = async (req, res, next) => {
    try {
        const trigger_calendar_id = req.params.id;
        const deletedTriggerCalendar = await trigger_calendar_data.deleteTriggerCalendar(trigger_calendar_id);
        res.send(deletedTriggerCalendar);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllTriggerCalendar,
    getTriggerCalendar,
    addTriggerCalendar,
    updateTriggerCalendar,
    deleteTriggerCalendar
}
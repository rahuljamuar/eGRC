const logger = require('./logger');

function createLogs(log_type, calling_function, module, email, parameter, message) {
    try {
        if (log_type == "info") {
            logger.info(calling_function, { meta: { module: module, email: email, parameter: parameter } });
        } else if (log_type == "error") {
            logger.info(calling_function, { meta: { module: module, email: email, parameter: parameter, error_message: message } });
        }

    } catch (e) {
        throw e;
    }
}

module.exports = createLogs;
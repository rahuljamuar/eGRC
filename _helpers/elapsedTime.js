const logger = require('./logger');


async function elapsedTime(start, function_name, module) {
    try {
        var elapsed = new Date() - start;                        
        logger.info(function_name, { meta: { module: module, execution_time: elapsed } } );
    } catch (e) {        
        errObj.code = errorCode.CE19001;
        errObj.sys_message = e.message;
        throw errObj;
    }
}


module.exports = elapsedTime;
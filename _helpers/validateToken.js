const logger = require('./logger');

async function validateToken(email, token) {
    try {
        await validate(email, token);
    } catch (e) {
       throw e;
    }
}

async function validate(email, token) {
    return new Promise((resolve, reject) => {
        logger.info("Validating access token for email " + email);
        if(email != "" && token == "test"){
            resolve(true);
        }else{
            reject(new Error("Invalid email id/token"));
        }  

    });
}

module.exports = validateToken;
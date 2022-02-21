require('module-alias/register');
const logger = require('@helpers/logger');
const config = require('config.json');
const errorCode = require('@helpers/error-codes');
require('dotenv').config({ silent: true });
const errObj = {};

async function validateToken(token, user_id) {
    try {
        await validate(token, user_id);
    } catch (e) {
        errObj.code = errorCode.CE02000;
        errObj.sys_message = e.message;
        throw errObj;
    }
}

async function validate(token, user_id) {
    return new Promise((resolve, reject) => {
        logger.info("Validating access token for user ID " + user_id);
        var request = require('request');
        var options = {
            'method': 'GET',
            'url': (process.env.VALIDATE_TOKEN_URL || config.validateTokenURL) + token,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) {
                logger.error("Error in validating access token for user ID " + user_id + ". Error Message: " + error);
                reject(new Error(error));
            }
            const result = JSON.parse(response.body);

            if (result.body.tokenStatus == false) {
                reject(new Error(result.body.tokenMessage));
                return
            }

            if (result.body.mypayload.email != user_id) {
                reject(new Error("Token is valid but it does not belong to user " + user_id));
                return
            }
            logger.info("Validate Token API response " + result.body.tokenStatus);
            resolve(result.body);
        });


    });
}

module.exports = validateToken;
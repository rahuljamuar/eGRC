const createLogs = require('./createLogs');
const elapsedTime = require('./elapsedTime');

async function validateToken(email, token) {
    try {
        await validate(email, token);
    } catch (e) {
       throw e;
    }
}

async function validate(email, token) {
    return new Promise((resolve, reject) => {
        createLogs("info", "validateToken", "Token", email, "", "");
        var start = new Date();
        if(email != "" && token == "test"){
            elapsedTime(start, "validateToken", "Token");
            resolve(true);
        }else{
            reject(new Error("Invalid email id/token"));
        }  

    });
}

module.exports = validateToken;
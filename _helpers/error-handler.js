module.exports = errorHandler;
// const lang = require('@helpers/lang');

const current_lang = 'en';

function errorHandler(err, req, res, next) {
    // if(err.code == "CE01000"){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // }
    // if(err.code == "CE02000"){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(401).json({code: err.code, message: error_message})
    // } 
    // if(err.code.includes("CE03")){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // } 
    // if(err.code.includes("CE04")){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // } 
    // if(err.code.includes("CE05")){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // } 
    // if(err.code.includes("CE06")){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // } 
    // if(err.code.includes("CE07")){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // } 
    // if(err.code.includes("CE08")){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // } 
    // if(err.code.includes("CE09")){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // } 
    // if(err.code.includes("CE10")){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // } 
    // if(err.code.includes("CE11")){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // } 
    // if(err.code.includes("CE12")){
    //     const error_message = lang.langTrans(current_lang, err.code) + ": " + err.sys_message;
    //     return res.status(500).json({code: err.code, message: error_message})
    // }  
      
    // if (typeof (err) === 'string') {
    //     // custom application error        
    //     return res.status(400).json({ message: err });
    // }

    // if(err.code == "CE1000") {
    //     return res.status(400).json(err);
    // }

    // if (err.name === 'ValidationError') {
    //     console.log("In validation error");
    //     // mongoose validation error
    //     const error_message = lang.langTrans(current_lang, err.name);
    //     return res.status(401).json({ message: error_message + err.message});
    // }

    // if (err.name === 'UnauthorizedError') {
    //     // jwt authentication error
    //     return res.status(400).json({ message: 'Invalid Token' });
    // }

    // if (err.name === 'Forbidden') {
    //     // jwt authentication error
    //     return res.status(403).json({ message: 'The client did not have permission to access the requested resource.' });
    // }

    // if (err.name === 'Service Unavailable') {
    //     // jwt authentication error
    //     return res.status(501).json({ message: 'Invalid Token' });
    // }


    // if (err.name === 'MongoError') {
    //     // jwt authentication error
    //     return res.status(405).json({ message: err });
    // }

    // default to 500 server error
    
    return res.status(500).json({ message: err.message });
}
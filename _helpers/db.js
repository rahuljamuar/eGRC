const sql = require('mssql')
const config = require('../config');
const logger = require('./logger');


const poolPromise = new sql.ConnectionPool(config.sql)
  .connect()
  .then(pool => {    
    logger.info("Connected to MSSQL");
    return pool
  })
  .catch(err => logger.error('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}
// var Connection = require('tedious').Connection;  
//     var config = {  
//         server: 'unilevercasm.database.windows.net',  //update me
//         authentication: {
//             type: 'default',
//             options: {
//                 userName: 'snehal.r@unicap.co.in@unilrevecasm', //update me
//                 password: 'Unilever123'  //update me
//             }
//         },
//         options: {
//             // If you are on Microsoft Azure, you need encryption:
//             encrypt: true,
//             database: 'Unilever_Stg'  //update me
//         }
//     };  
//     var connection = new Connection(config);  
//     connection.on('connect', function(err) {  
//         // If no error, then good to proceed.
//         console.log("Connected");  
//     });
    
//     connection.connect();

//     var Request = require('tedious').Request;  
//     var TYPES = require('tedious').TYPES;  
  
//     function executeStatement() {  
//         request.callback = new Request("SELECT * FROM Control_Details;", function(err) {  
//         if (err) {  
//             console.log(err);}  
//         });  
//         var result = "";  
//         request.on('row', function(columns) {  
//             columns.forEach(function(column) {  
//               if (column.value === null) {  
//                 console.log('NULL');  
//               } else {  
//                 result+= column.value + " ";  
//               }  
//             });  
//             console.log(result);  
//             result ="";  
//         });  
  
//         request.on('done', function(rowCount, more) {  
//         console.log(rowCount + ' rows returned');  
//         });  
        
//         // Close the connection after the final event emitted by the request, after the callback passes
//         request.on("requestCompleted", function (rowCount, more) {
//             connection.close();
//         });
//         connection.execSql(request);  
//     }
//     executeStatement();  
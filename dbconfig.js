const  config = {
    user:  'snehal.r@unicap.co.in@unilrevecasm', // sql user
    password:  'Unilever123', //sql user password
    server:  'unilevercasm.database.windows.net', // if it does not work try- localhost
    database:  'Unilever_Stg',
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  'unilevercasm'  // SQL Server instance name
    },
    port:  55892
  }
  
  module.exports = config;
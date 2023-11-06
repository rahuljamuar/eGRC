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
    port:  55892,
    filestoragedev: '?sp=racwdli&st=2023-11-03T18:31:42Z&se=2024-06-01T02:31:42Z&spr=https&sv=2022-11-02&sr=c&sig=xaOfmG5vqx9r3NpVpfw1745kRuGtxAeDOzhIID1oFDA%3D',
    filestorageuat: '?sp=racwdli&st=2023-11-05T17:00:31Z&se=2024-06-04T01:00:31Z&spr=https&sv=2022-11-02&sr=c&sig=AonZD00TLhnktU1aWaXibsq7HhVYuKOgXKHmnZHp484%3D' 
  }
  
  module.exports = config;
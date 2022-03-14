// 'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./_helpers/error-handler');
const logger = require('./_helpers/logger');

const question_details_routes = require('./_routes/question_details');
const mapping_routes = require('./_routes/mapping');
const share_link_routes = require('./_routes/share_link');
const transaction_routes = require('./_routes/transaction');
const utility_routes = require('./_routes/utility');
const user_routes = require('./_routes/user_details');
const reviewer_routes = require('./_routes/reviewer_details');




const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.all("*", (req, res, next) => {  
  logger.info("Incoming request", { meta: { method: req.method, url: req.originalUrl, IP: req.ips } }); 
  return next();
})

app.use('/api/question', question_details_routes.routes);
app.use('/api/mapping', mapping_routes.routes);
app.use('/api/share_link', share_link_routes.routes);
app.use('/api/transaction', transaction_routes.routes);
app.use('/api/utility', utility_routes.routes);
app.use('/api/user', user_routes.routes);
app.use('/api/reviewer', reviewer_routes.routes);


// global error handler
app.use(errorHandler);

app.set('trust proxy', true);

app.listen(config.port, () => {  
  logger.info('Server started at port ' + config.port);
});
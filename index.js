// 'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const question_details_routes = require('./_routes/question_details');
const mapping_routes = require('./_routes/mapping');
const share_link_routes = require('./_routes/share_link');
const transaction_routes = require('./_routes/transaction');
const utility_routes = require('./_routes/utility');




const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());




app.use('/api/question', question_details_routes.routes);
app.use('/api/mapping', mapping_routes.routes);
app.use('/api/share_link', share_link_routes.routes);
app.use('/api/transaction', transaction_routes.routes);
app.use('/api/utility', utility_routes.routes);



app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port )
});
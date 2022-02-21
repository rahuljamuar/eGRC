'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const control_details_routes = require('./_routes/control_details');
const mapping_routes = require('./_routes/mapping');



const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', control_details_routes.routes);
app.use('/api', mapping_routes.routes);



app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port )
});
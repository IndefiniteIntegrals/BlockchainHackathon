const SHA256 = require('crypto-js/sha256');
const express = require('express');
const app = express();
const Block = require('./models/block');
const blockchain = require('./models/car');
const routes = require('./routes');

const database = require('./models/mongo');

const PORT = 7200;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', null);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/v1',routes.api);
app.use('/api/vue',routes.vue);

app.listen(PORT,()=>{
	console.log('Blocking your chain on : ' + PORT);
});
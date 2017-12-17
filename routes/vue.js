const express = require('express');
const router = express.Router();

const SHA256 = require('crypto-js/sha256');
const Block = require('../models/block');
const blockchain = require('../models/car');
const formidable = require('formidable');
const mongodb = require('mongodb');
const database = require('../models/mongo');

router.get('/block',function(req,res){
    console.log('Vue-Api Call');
    res.json(blockchain.getLatestBlock());
});

router.get('/getBlock',function(req,res){
    console.log('Sending Block: ' + req.query.blockID);
    database.findAndSend(req.query.blockID,res);
});

module.exports = router;
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

router.post('/user',function(req,res){
    console.log('Creating a user');
    var form = new formidable.IncomingForm();

    var user = {
        name: '',
        aadhar: '',
        pan: '',
        address: '',
        uniqueID: ''
    };

    form.parse(req, function(err,fields,files){
        user.name = fields.name;
        user.aadhar = fields.aadhar;
        user.pan = fields.pan;
        user.address = fields.address;

        user.uniqueID = SHA256(user.name + (user.aadhar).toString() + (user.pan).toString() + (user.address).toString());
    });

    database.addUserUnique(user,res);


});
module.exports = router;
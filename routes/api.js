const express = require('express');
const router = express.Router();

const database = require('../models/mongo')
const SHA256 = require('crypto-js/sha256');
const Block = require('../models/block');
const blockchain = require('../models/car');

router.get('/mine',function(req,res){
    if(req.query.sender && req.query.reciever && req.query.carID){

        console.log('Mining Block');

        var transaction = new Block(
                blockchain.getLatestBlock().index + 1,
                (new Date).toString(),
                {
                    sender: req.query.sender,
                    reciever: req.query.reciever,
                    carID: req.query.carID
                }
            );
        blockchain.addBlock(transaction);

        database.addBlocktoDatabase(blockchain.getLatestBlock());

        res.send('Mined');
    }
    else{
        res.send('Incorrect Parameters');
    }

});

router.get('/show',function(req,res){
    console.log('Show');

    res.json(blockchain);
});

module.exports = router;
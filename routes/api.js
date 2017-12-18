const express = require('express');
const router = express.Router();

const database = require('../models/mongo')
const SHA256 = require('crypto-js/sha256');
const Block = require('../models/block');
const blockchain = require('../models/car');

router.post('/transaction/mine',function(req,res){
    if(req.query.sender && req.query.reciever && req.query.carID){

        console.log('Mining Block');

        var data = {
                        sender: req.query.sender,
                        reciever: req.query.reciever,
                        carID: req.query.carID
                    }
        database.verifyCarOwnerExists(data,function(){
            var transaction = new Block(
                    blockchain.getLatestBlock().index + 1,
                    (new Date).toString(),
                    data
                );
            blockchain.addBlock(transaction);

            database.addBlocktoDatabase(blockchain.getLatestBlock());
            database.deleteCarsAvailable(data,res)
        });
    }
    else{
        res.send('Incorrect Parameters');
    }


});

router.get('/show',function(req,res){
    console.log('Show');

    res.json(blockchain);
});

router.get('/sell',function(req,res){
    console.log('Want to sell');
    var userObj = {
        uniqueID : req.query.uniqueID,
        carID : req.query.carID
    };

    database.addCarToSell(userObj,res);
});

router.get('/sellInfo',function(req,res){
    console.log('Getting Cars');
    database.allCarsToSell(res);
});

router.get('/chain',function(req,res){
    console.log('Blockchain requested');
    database.getBlockchain(res);
})

module.exports = router;
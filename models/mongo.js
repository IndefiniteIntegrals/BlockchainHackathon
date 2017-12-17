const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/nodeblock";

module.exports = {
    addBlocktoDatabase : function(newBlock){
        MongoClient.connect(url,function(err,db){
            if(err){
                console.log(err);
            }
            else{
                var chain = db.collection('chain');
                chain.insert(newBlock,function(err,res){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(res.insertedCount.toString() + ' Transactions Inserted');
                    }
                });
            }
        });
    },
    findAndSend : function(blockID,res){
        MongoClient.connect(url,function(err,db){
            if(err){
                console.log(err);
            }
            else{
                var chain = db.collection('chain');
                chain.findOne({
                    "hash"  : blockID
                },function(err,result){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json(result);
                    }
                    db.close();
                });
            }
        });
    }
}
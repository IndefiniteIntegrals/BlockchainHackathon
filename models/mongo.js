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
    },
    addUserUnique : function(user,res){
        MongoClient.connect(url,function(err,db){
            if(err){
                console.log(err);
            }
            else{
                var userCollection = db.collection('user');
                userCollection.insert(user,function(err,resp){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(resp.insertedCount.toString() + ' User Inserted');
                        res.json(user);
                    }
                    db.close();
                });
            }
        });
    },
    addCarToSell : function(userObj,res){
        MongoClient.connect(url,function(err,db){
            if(err){
                console.log(err);
            }
            else{
                var sellingList = db.collection('sellingList');
                sellingList.insert(userObj,function(err,resp){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(resp.insertedCount.toString() + ' Car Added to Database');
                        res.send('OK-Added to Database');
                    }
                    db.close();
                });
            }
        });
    },
    allCarsToSell : function(res){
        MongoClient.connect(url,function(err,db){
            if(err){
                console.log(err);
            }
            else{
                var sellingList = db.collection('sellingList');
                sellingList.find({}).toArray(function(err,result){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json(result);
                    }
                    db.close();
                });
            }
        })
    },
    deleteCarsAvailable : function(data,res){
        MongoClient.connect(url,function(err,db){
            if(err){
                console.log(err);
            }
            else{
                var sellingList = db.collection('sellingList');
                sellingList.deleteOne({
                    uniqueID : data.sender,
                    carID : data.carID
                },function(err,result){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("1 Car Sold");
                        res.send('Transaction Complete');
                    }
                    db.close();
                });
            }
        });
    },
    getBlockchain : function(res){
        MongoClient.connect(url,function(err,db){
            if(err){
                console.log(err);
            }
            else{
                var chain = db.collection('chain');
                chain.find({}).toArray(function(err,result){
                   if(err) {
                    console.log(err);
                   }
                   else{
                    res.json(result);
                   }
                   db.close();
                });
            }
        });
    },
    verifyCarOwnerExists : function(data,callback){
        MongoClient.connect(url,function(err,db){
            if(err){
                console.log(err);
            }
            else{
                var sellingList = db.collection('sellingList');
                sellingList.find({
                    uniqueID : data.sender,
                    carID : data.carID
                }).toArray(function(err,result){
                    if(err){
                        console.log(err)
                    }
                    if(result.length){
                        callback()
                    }
                    else{
                        return;
                    }
                    db.close();
                });
            }
        });
    }
}
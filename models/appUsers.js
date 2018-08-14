var ObjectId = require('mongodb').ObjectID;
var dbConnection = require('../config/database');

exports.getAllUsers = function(userId){

    return new Promise(function(resolve, reject){
        
        var db = dbConnection.getDb();
        db.collection("users").find(
            {_id : {$ne: ObjectId(userId)}})
            .project({name: 1})
            .toArray(function(error, results) {
                
                if (error)
                    reject('failed.');
                else
                    resolve(results);
        });
    });
}

exports.getAllFriendsIds = function(userId){
    
    return new Promise(function(resolve, reject){
        
        var db = dbConnection.getDb();
        db.collection("users").find(ObjectId(userId))
            .project({_id: 0, friends: 1})
            .toArray(function(error, results) {
                
                if (error)
                    reject('failed.');
                else
                    resolve(results);
        });
    });
}


exports.getAllFriends = function(userIds){

    for (let i=0; i<userIds.length; i++)
        userIds[i] = ObjectId(userIds[i]);
    
    return new Promise(function(resolve, reject){
        
        var db = dbConnection.getDb();
        db.collection("users").find(
            {_id : {$in: userIds}})
            .project({name: 1})
            .toArray(function(error, results) {
                
                if (error)
                    reject('failed.');
                else
                    resolve(results);
        });
    });
}

exports.getUserDetails = function(userId){

    return new Promise(function(resolve, reject){
        
        var db = dbConnection.getDb();
        db.collection("users").find(
            ObjectId(userId))
            .project({_id: 0, name: 1, email: 1, age: 1, city: 1})
            .toArray(function(error, result) {

                if (error)
                    reject('failed.');
                else
                    resolve(result);
                return;
        });
        
    });
}


exports.addFriend = function(userId, friendId){

    return new Promise(function(resolve, reject){
        
        var db = dbConnection.getDb();
        db.collection("users").updateOne(
            {_id: ObjectId(userId)},
            {$addToSet: {friends: friendId}},
            function(error, result) {

            if (error){

                reject('failed.');
            }
            else {

                db.collection("users").updateOne(
                    {_id: ObjectId(friendId)},
                    {$addToSet: {friends: userId}},
                    function(error, result) {
        
                        if (error)
                            reject('failed.');
                        else 
                            resolve(result);
                });
            }
            return;
        });
        
    });
}
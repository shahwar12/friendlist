var model = require('../models/appUsers');

exports.getAllUsers = function(userId, res){
    
    var data = [];
    model.getAllUsers(userId)
    .then(function(results){
        
        if (results.length >= 1){

            data = results;
            return model.getAllFriendsIds(userId);
        }
        else {

            return new Promise((fulfill, reject) => {
                fulfill('no users');
            });
        }
    })
    .then(function(results){
        
        if (results == "no users"){

            res.send({status: true, message: "No other users are available.", data: null});
        }
        else {
            
            for(var i=0; i<data.length; i++){

                data[i].frnd = 0;
                for(var j=0; j<results[0].friends.length; j++){

                    if (data[i]._id == results[0].friends[j]){

                        data[i].frnd = 1;
                        break;
                    }
                }
            }

            res.send({status: true, message: "Data received.", data: data});
        }
    })
    .catch(function(error) {
        
        res.send({status: false, message: "Failed to get data.", data: null});
    });

    return;
};

exports.getAllFriends = function(userId, res){
    
    model.getAllFriendsIds(userId)
    .then(function(results){
        
        if (results[0].friends.length >= 1){
            
            return model.getAllFriends(results[0].friends);
        }
        else {

            return new Promise((fulfill, reject) => {
                fulfill('no users');
            });
        }
    })
    .then(function(results){
        
        if (results == "no users"){

            res.send({status: true, message: "You have no friends.", data: null});
        }
        else {
        
            res.send({status: true, message: "Data received.", data: results});
        }
    })
    .catch(function(error) {
        
        res.send({status: false, message: "Failed to get data.", data: null});
    });

    return;
};


exports.getUserDetails = function(userId, res){
    
    model.getUserDetails(userId)
    .then(function(result){
        
        if (result){

            res.send({status: true, message: "Data received.", data: result[0]});
        }
        else {
        
            res.send({status: true, message: "User detail is not available.", data: null});
        }
    })
    .catch(function(error) {
        
        res.send({status: false, message: "Failed to get data.", data: null});
    });

    return;
};

exports.addFriend = function(userId, friendId, res){
    
    model.addFriend(userId, friendId)
    .then(function(result){
        
        if (result){

            res.send({status: true, message: "Data added.", data: result[0]});
        }
        else {
        
            res.send({status: true, message: "Unable to add friend.", data: null});
        }
    })
    .catch(function(error) {
        
        res.send({status: false, message: "Failed to add data.", data: null});
    });

    return;
};
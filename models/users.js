var dbConnection = require('../config/database');

exports.registerUser = function(data){

    data.friends = [];
    return new Promise(function(resolve, reject){
        
        var db = dbConnection.getDb();
        db.collection("users").findOne({email:data.email}, function(error, result) {
            
            if (error){

                reject('failed.');
            }
            else if (result){

                resolve('already registered.');
            }
            else {

                db.collection("users").insertOne(data, function(error, res){
            
                    if (error)
                        reject('failed.');
                    else
                        resolve('success.');
                });
            }
            return;
        });
        
    });
}

exports.loginUser = function(data){

    return new Promise(function(resolve, reject){
        
        var db = dbConnection.getDb();
        db.collection("users").findOne(
            {email:data.email, password:data.password},
            {_id: 1, name: 1, email: 1, age: 1, city: 1},
            function(error, result) {
                if (error)
                    reject('failed.');
                else
                    resolve(result);
                return;
        });
        
    });
}
var model = require('../models/users');

exports.registerUser = function(data, res){
    
    model.registerUser(data)
    .then(function(result){
        
        if (result == 'already registered.')
            res.send({status: true, message: "The provided email is already registered.", data: null});
        else
            res.send({status: true, message: "Successfully registered.", data: null});
    })
    .catch(function(error) {
    
        res.send({status: false, message: "User registeration failed.", data: null});
    });

    return;
};


exports.loginUser = function(data, res){
    
    model.loginUser(data)
    .then(function(result){

        if (result)
            res.send({status: true, message: "Successfully logged in.", data: result});
        else
            res.send({status: true, message: "Invalid email or password.", data: null});
    })
    .catch(function(error) {
        
        res.send({status: false, message: "Login failed.", data: null});
    });

    return;
};
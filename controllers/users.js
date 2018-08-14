var events = require('events');
var jwt = require('jsonwebtoken');
var auth = require('../config/auth');
var model = require('../models/users');
var emailer= require('../config/email.js');
var eventEmitter = new events.EventEmitter();

exports.registerUser = function(data, res){
    
    model.registerUser(data)
    .then(function(result){
        
        if (result == 'already registered.'){

            res.send({status: true, message: "The provided email is already registered.", data: null});
        }
        else {

            eventEmitter.emit('UserEvent', data);
            res.send({status: true, message: "Successfully registered.", data: null});
        }
            
    })
    .catch(function(error) {
        console.log(error);
        res.send({status: false, message: "User registeration failed.", data: null});
    });

    return;
};


exports.loginUser = function(data, res){
    
    model.loginUser(data)
    .then(function(result){
        
        if (result){

            var data = {};
            var jwtInput = {
                Id: result._id
            };

            var token = jwt.sign(jwtInput, auth.secret, {
                expiresIn: auth.tokenExpireTime 
            });

            data.name = result.name;
            data.email = result.email;
            data.age = result.age;
            data.city = result.city;
            data.token = 'JWT ' + token;
            data.tokenExpireTime = auth.tokenExpireTime;

            res.send({status: true, message: "Successfully logged in.", data: data});
        }
        else {

            res.send({status: true, message: "Invalid email or password.", data: null});
        }
    })
    .catch(function(error) {
        
        res.send({status: false, message: "Login failed.", data: null});
    });

    return;
};

eventEmitter.on('UserEvent', function(data){

    var mailOptions = {
        from: 'myfriendlist1@gmail.com',
        to: data.email,
        subject: 'Welcome',
        text: `Hello `+data.name+`,\n\nWelcome to My Friend List.Thank you for choosing us.\n\nRegards,\nTeam My Friends List.`
    };

    emailer.sendMail(mailOptions, function(error, info){
        if (error) throw error;
    });
});
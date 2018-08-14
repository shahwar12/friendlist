var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var auth = require('../config/auth');
var model = require('../models/users');

module.exports = function(passport) {
    
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = auth.secret;
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        
        model.getUserById(jwt_payload.Id)
        .then(function(result){

            if (result){
                
                var user = {
                    Id: jwt_payload.Id
                };
                done(null, user);   
            }
            else {
                
                done(error, null);            
            }
        })
        .catch(function(error) {
            
            done(error, null);
        });

        return;
    }));
};

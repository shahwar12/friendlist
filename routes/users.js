var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');

router.post('/registerUser', function(req, res){

    controller.registerUser(req.body, res);
});

router.post('/loginUser', function(req, res){

    controller.loginUser(req.body, res);
});

module.exports =  router;
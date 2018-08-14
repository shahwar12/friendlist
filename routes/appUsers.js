var express = require('express');
var router = express.Router();
var controller = require('../controllers/appUsers');

router.get('/getAllUsers', function(req, res){

    controller.getAllUsers(req.user.Id, res);
});

router.get('/getAllFriends', function(req, res){

    controller.getAllFriends(req.user.Id, res);
});

router.get('/getUserDetails', function(req, res){

    controller.getUserDetails(req.query.Id, res);
});

router.post('/addFriend', function(req, res){

    controller.addFriend(req.user.Id, req.body.Id, res);
});

module.exports =  router;
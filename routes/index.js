var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

router.get('/', function(req, res){

    controller.index(req, res);
});

module.exports =  router;
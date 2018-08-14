var express = require('express');
var router = express.Router();
var controller = require('../controllers/main');

router.get('/', function(req, res){
    
    controller.main(req, res);
});

module.exports =  router;
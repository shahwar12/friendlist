var express = require('express');
var cfenv = require('cfenv');
var dbConnection = require('./config/database');
var users = require('./routes/users');

var app = express();

var appEnv = cfenv.getAppEnv();

app.use('/users', users);

// app.get('/', function(req, res){

//   console.log('home page');
// });

// app.get('/addUser', function(req, res){

//     var db = dbConnection.getDb();
    
//     var userObj = { name: "Shahwar", email:"syed.shahwar7@gmail.com", password: "123456" };
    
//     db.collection("users").insertOne(userObj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//     });

// });

dbConnection.connectToDatabase().then(function(results) {

  console.log('App is connected to Mongodb');
});

app.listen(appEnv.port, '0.0.0.0', function() {
  
  console.log("App is listening on " + appEnv.url);
});

var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var passport = require('passport');
var dbConnection = require('./config/database');
var index = require('./routes/index');
var users = require('./routes/users');
var main = require('./routes/main');
var appUsers = require('./routes/appUsers');

var app = express();
var appEnv = cfenv.getAppEnv();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());  
require('./controllers/passport')(passport);   

app.use('/', index);
app.use('/users', users);
app.use('/main', main);

app.use(function(req, res, next) {

    passport.authenticate('jwt', { session: false })(req, res, function () {
        
        if (!req.user){
          
            res.send('unauthorized');
            return;
        }
        else {

            next();
        }
    });
});

app.use('/appUsers', appUsers);      //endpoints with which authorizes using passport and jwt

dbConnection.connectToDatabase().then(function(results) {

    console.log('Connected to Mongodb');
    app.listen(appEnv.port, '0.0.0.0', function() {
  
      console.log("App has been started on " + appEnv.url);
    });
});



let express = require('express');

let app = express();


app.get('/', function (req, res) {
    
    res.send('home page');
});

app.get('/user', function (req, res) {
    
    res.send('user page');
});

let listener = app.listen('3000', function() {
   
    console.log('App is listening at 3000');
});




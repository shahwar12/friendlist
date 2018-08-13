var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://list:my1friend@ds119652.mlab.com:19652/myfriendlist';
var dbName = 'myfriendlist';
var db;

exports.dbName = 'myfriendlist';

exports.connectToDatabase = function(){

    return new Promise(function(fullfill, reject){

        MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
            if (err)
                return reject('Database connection failed.');
                
            db = client.db(dbName);;
            return fullfill('Database connected.');
          });
    });
};

exports.getDb = function(){

    return db;
};


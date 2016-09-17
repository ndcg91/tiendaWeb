/**
 *
 * Configuretion and initialization.
 * Http or Https, ports initialization of socket.io and databases
 *
 * Name Convention
 * Type + variable Name cammel case
 */
var exports = module.exports;
//The port that will be used for socket.io and the api
var port    = process.env.PORT || 8080;
exports.port = port;
/*=============================================>>>>>
= Database Connection =
===============================================>>>>>*/

var mongoose = require('mongoose');
var dbUser      = 'testUser';
var dbPassword  = 'testPassword';
var dbHost      = '127.0.0.1';
var dbPort      = '27017';
var dbName      = 'testDB';
console.log('mongodb://'+ dbUser + ':' + dbPassword + '@' + dbHost + ':' + dbPort + '/' + dbName);
mongoose.connect('mongodb://'+ dbUser + ':' + dbPassword + '@' + dbHost + ':' + dbPort + '/' + dbName);


//Initialize one variable for each collection in mongo Database
var workers = require('./db/workers.js');
exports.Workers = workers;


/*= End of Database Connection =*/
/*=============================================<<<<<*/





//Setting the html listener variables and the route to serve our api
var express     = require('express');
var router      = express.Router();
var app         = express();
var http        = require('http');
var server      = http.createServer(app);
var bodyParser  = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers,X-Requested-With, Content-Type, Accept');
        res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        next();
});
app.use('/api',router);

exports.app = app;
exports.server = server;
exports.router = router;




//Socket IO initialization
var io  = require('./socketIO/socket.js').listen(server);

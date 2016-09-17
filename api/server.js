var config = require('./config.js');
var server = config.server;
var ports  = config.port;
var router = config.router;
var crud   = require('./crud.js')(router);
var Workers= config.Workers;
var port   = config.port;

//crud for workers database
//Params:
//DB, DBName, a list with db fields, a boolean indicationg each of the cruds operation if it should be authenticated or not
crud.createCrud(Workers,
  'workers', //DB NAME
  ['name','lastname','address'], //DB FIELDS
  false, //authentication get all workers
  false, //authentication get worker
  false, //authentication create worker
  false, //authentication update worker
  false //authentication remove worker
);


server.listen(port);

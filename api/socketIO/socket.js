var exports = module.exports = {};
var config      = require('../config.js');
var server      = config.server;
var socketio = require('socket.io')

module.exports.listen = function(server){
    io = socketio.listen(server,{ origins:'*:*'})
                io.on("connection", handleClient);
    return io
}

function handleClient(socket){
  //SOCKET IO crud
  
}

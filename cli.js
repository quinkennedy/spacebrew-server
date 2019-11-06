#!/usr/bin/env node

//for serving admin interface
var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var path = require('path');
var commander = require('commander');

commander
    .version(require('./package.json').version)
    .option('-p, --port [number]', 'set port', '9000')
    .option('-i, --interface [ip]', 'set interface', '0.0.0.0')
    .parse(process.argv)

//spacebrew modules
var SpacebrewManager = require('@spacebrew/server-core').Manager;
var WebSocketServer = require('@spacebrew/server-websocket');

/**
Server and handling for the admin interface
**/
// Serve up public folder
var publicPath = path.join(__dirname, 'public');
var serve = serveStatic(publicPath, {'index': ['index.html', 'index.htm']});

// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res));
});

// Listen
server.listen(commander.port, commander.interface, onListening);

function onListening(){
  var addr = server.address();
  console.log(
    'Spacebrew server listening on interface',
    addr.address, 'and port', addr.port);
  console.log(
    'Press Ctrl+C to stop the server'
  )
}

/**
Spacebrew comm and routing
**/
var sbManager = new SpacebrewManager();
var wsServer = new WebSocketServer(sbManager, {server});

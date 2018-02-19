#!/usr/bin/env node

console.log('loading and starting');

//for serving admin interface
var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

//spacebrew modules
var SpacebrewManager = require('@spacebrew/server-core').Manager;
var WebSocketServer = require('@spacebrew/server-websocket');

/**
Server and handling for the admin interface
**/
// Serve up public folder
var serve = serveStatic('public', {'index': ['index.html', 'index.htm']});

// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res));
})
 
// Listen
server.listen(9000);

/**
Spacebrew comm and routing
**/
var sbManager = new SpacebrewManager();
var wsServer = new WebSocketServer(sbManager, {server});

console.log('loaded and started');

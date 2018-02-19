#!/usr/bin/env node

console.log('loading and starting');
var SpacebrewManager = require('@spacebrew/server-core').Manager;
var WebSocketServer = require('@spacebrew/server-websocket');

var sbManager = new SpacebrewManager();
var wsServer = new WebSocketServer(sbManager);
console.log('loaded and started');

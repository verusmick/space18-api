const express = require('express');
const app = express();
// const database = require('../Database/database')
const moment = require('moment');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 40510});

exports.postEvent = function (req, res, next) {
  let coordinate = req.body[0];
  app.emit('postEvent', {
    latitude: coordinate.latitude,
    longitude: coordinate.longitude,
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
  });
}

exports.TrackEvents = (req, res, next) => {
  // SSE Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write('\n');

  let messageId = 7029468;
  app.on('postEvent', data => {
    res.write(`id: ${messageId}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  })
}

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocketServer.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws) {
        client.send(data);
      }
    });
  });
});
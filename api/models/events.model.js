const express = require('express');
const app = express();
// const database = require('../Database/database')
const moment = require('moment');

exports.postEvent = function (req, res, next) {
  let coordinate = req.body[0];
  app.emit('postEvent', {
    latitude: coordinate.latitude,
    longitude: coordinate.longitude,
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
  });
  // let query = `INSERT INTO coordinates (id_user, latitude, longitude, timestamp) VALUES ('7029468LP','${coordinate.latitude}','${coordinate.longitude}','${moment().format('YYYY-MM-DD HH:mm:ss')}')`;
  // database.query(query, (err, results) => {
  //   if (err) throw next(err);
  //   res.json({status: "success", message: "coordinate added successfully!!!", data: null});
  // })
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
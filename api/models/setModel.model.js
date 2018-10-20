const express = require('express');
const app = express();
const moment = require('moment');

exports.setModel = function (req, res, next) {
  let model = req.body.model;
  if (model === 'pressure' || model === 'temp' || model ==='model1' || model ==='model2') {
    res.json({status: "success", message: `${model} model setted`});

    return false;
  }

  res.json({status: "success", message: `${model} model not exist`});

  // app.emit('postEvent', {
  //   latitude: coordinate.latitude,
  //   longitude: coordinate.longitude,
  //   timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
  // });
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
const express = require('express');
const app = express();
const moment = require('moment');

exports.setModel = function (req, res, next) {
  let model = req.body.model;
  if (model === 'pressure' || model === 'temp' || model === 'model1' || model === 'model2') {
    app.emit('event', {
      data: model,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
    });
    res.json({status: "success", message: `${model} model setted`});
    return false;
  }
  res.json({status: "success", message: `${model} model not exist`});
}


exports.events = (req, res, next) => {
  let status;
  let messageId = 7029468;
  // SSE Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write('\n');


  app.on('event', data => {
    status = data;
    writeEvent();
  })

  setInterval(writeEvent, 20000);
  function writeEvent() {
    res.write(`id: ${messageId}\n`);
    res.write(`model: ${JSON.stringify(status)}\n\n`);
  }
}


const express = require('express');
const app = express();
const moment = require('moment');

exports.setModel = function (req, res, next) {
  let model = req.body.model;
  if (model === 'pressure' || model === 'temp' || model === 'model1' || model === 'model2') {
    app.emit('changeModel', {
      data: model
    });
    res.json({status: "success", message: `${model} model setted`});
    return false;
  }
  res.json({status: "success", message: `${model} model not exist`});
}


exports.events = (req, res, next) => {
  // SSE Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  app.on('changeModel', model => {
    setMessage('changeModel', model.data, res)
  });
  setInterval(writeEvent, 1000);
  function writeEvent() {
    setMessage('idle', 'This is event idle.', res)
  }
};

function setMessage(event, data, res) {
  res.write(
    `event: ${event}\ndata:${data}`
  );
  res.write('\n\n');
}


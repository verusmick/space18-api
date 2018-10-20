var express = require('express')
var router = express.Router()
var userHandlers = require('../models/setModel.model')


router.put('/', userHandlers.setModel);


// Token interceptor
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.status(403).json({status: "error", message: err.message, data: null});
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}
module.exports = router;
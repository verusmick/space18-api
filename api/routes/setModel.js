var express = require('express')
var router = express.Router()
var modelHandlers = require('../models/setModel.model')


router.put('/setModel', modelHandlers.setModel);

router.get('/events', modelHandlers.events);



module.exports = router;
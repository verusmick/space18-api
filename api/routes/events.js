var express = require('express');
var router = express.Router();
var gpsTrackingHandlers = require('../models/events.model');

/* GET users listing. */
router.get('/events', gpsTrackingHandlers.TrackEvents);
router.post('/events', gpsTrackingHandlers.postEvent);

module.exports = router;

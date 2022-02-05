const router = require('express').Router();

require('./api')(router);

module.exports = app => app.use('', router);
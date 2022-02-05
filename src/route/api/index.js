const router = require('express').Router();

require('./digitalizacao')(router);
require('./user')(router);

module.exports = app => app.use('/api', router);
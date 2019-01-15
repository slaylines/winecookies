const express = require('express');
const autoroutes = require('./utils/autoroutes');

const router = express.Router();

autoroutes(router);

module.exports = router;

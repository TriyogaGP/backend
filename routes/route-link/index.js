const express = require('express');
const router = express.Router();

const api = require('./api');
const login = require('./login');
const user = require('./user');

router
    .use('/moduleApi', api)
    .use('/moduleLogin', login)
    .use('/moduleUser', user)

module.exports = router
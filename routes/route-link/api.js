var express = require('express');
var router = express.Router();
const { verifyToken } = require('../../middleware/verifyToken.js');
const { c_api } = require('../../controllers');

router
    .get('/bootcamp', verifyToken, c_api.readData)
    .get('/bootcamp/:id', c_api.readDataBy)
    .post('/bootcamp', c_api.insertData)
    .post('/bootcamp/:id', c_api.updateData)
    .delete('/bootcamp/:id', c_api.deleteData)

module.exports = router;
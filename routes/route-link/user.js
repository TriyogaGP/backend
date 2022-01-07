var express = require('express');
var router = express.Router();
const { verifyToken } = require('../../middleware/verifyToken.js');
const { uploadFile } = require('../../middleware/uploadFile.js');
const { c_user } = require('../../controllers');

router
    .get('/getusers', verifyToken, c_user.readData)
    .post('/updateusers', c_user.updateData)
    // .get('/getusers/:id', verifyToken, c_user.readDataByID)
    // .post('/register', c_user.register)
    // .post('/updateImage', uploadFile, c_user.updateImage)
    // .delete('/getusers/:id', c_user.deleteData)
    
module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../../modules/mailer');
const crypt = require('crypto');

const authConfig = require('../../config/auth');

const Request = require('../models/request');
const User = require('../models/user');

/*function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}*/ 

const router = express.Router();
router.post('/request', async (req, res) => {
    const request = await Request.create(req.body);

    return res.send(request);
});

router.get('/list/request', async (req, res) => {
    const request = await Request.find();
    
    return res.send(request);
});


module.exports = app =>  app.use('/auth', router);
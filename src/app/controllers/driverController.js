const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../../modules/mailer');
const crypt = require('crypto');

const authConfig = require('../../config/auth');

const Driver = require('../models/driver');

/*function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}*/ 

const router = express.Router();
router.post('/driver', async (req, res) => {
    const request = await Driver.create(req.body);

    return res.send(request);
});

router.get('/list/driver', async (req, res) => {
    const request = await Driver.find();
    
    return res.send(request);
});


module.exports = app =>  app.use('/auth', router);
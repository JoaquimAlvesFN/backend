const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../../modules/mailer');
const crypt = require('crypto');

const authConfig = require('../../config/auth');

const Payment = require('../models/payment');

/*function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}*/ 

const router = express.Router();
router.post('/payment', async (req, res) => {
    const request = await Payment.create(req.body);

    return res.send(request);
});

router.get('/list/payment', async (req, res) => {
    const request = await Payment.find();
    
    return res.send(request);
});


module.exports = app =>  app.use('/auth', router);
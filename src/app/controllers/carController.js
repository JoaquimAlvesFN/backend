const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../../modules/mailer');
const crypt = require('crypto');

const authConfig = require('../../config/auth');

const Car = require('../models/car');

/*function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}*/ 

const router = express.Router();
router.post('/car', async (req, res) => {
    const request = await Car.create(req.body);

    return res.send(request);
});

router.get('/list/car', async (req, res) => {
    const request = await Car.find();
    
    return res.send(request);
});


module.exports = app =>  app.use('/auth', router);
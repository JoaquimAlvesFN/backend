const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../../modules/mailer');
const crypt = require('crypto');

const authConfig = require('../../config/auth');

const User = require('../models/user');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

const router = express.Router();
router.post('/register', async (req, res) => {
    const { email } = req.body;
    try{
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'usuario ja existe' });
        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({ 
            user,
            token: generateToken({ id: user.id })
        });
    }catch (err){
        return res.status(400).send({error: 'error'});
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ error: 'usuario nao encontrado' });
    
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'senha invalida' });

    user.password = undefined;    

    res.send({ 
        user, 
        token: generateToken({ id: user.id })
    });
});

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try{
        const user = User.findOne({ email });

        if(!user)
            return res.status(400).send({ error: 'usuario nao encontrado' });

        const token = crypt.randomBytes(20).toString('hex');
        
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'joaquim.alves@hiperferro.com.br',
            template: 'auth/forgot_password',
            context: { token },
        }, (err) => {
            if(err)
                return res.status(400).send({ error: 'nao foi possivel enviar o email!' });

            return res.send();
        });

    }catch(err){
        console.log(err);
        res.status(400).send({ error: 'forgot password' });
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;

    try{
        const user = User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

        if(!user)
            return res.status(400).send({ error: 'usuario nao encontrado' });
        
        if(token !== passwordResetToken)
            return res.status(400).send({ error: 'Token Invalid' });

        const now = Date();

        if(now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired' });

        user.password = password;
        await user.save();
        res.send();
        
    }catch(err){
        res.status(400).send({ error: 'error...' });
    }
});

module.exports = app =>  app.use('/auth', router);
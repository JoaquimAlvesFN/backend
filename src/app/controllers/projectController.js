const express = require('express');
const router = express.Router();

const authMiddleweare = require('../middlewears/auth');

router.use(authMiddleweare);

router.get('/', (req, res) => {
    return res.status(200).send({res: 'OK cheguei no NodeJS'});
});

module.exports = app => app.use('/projects', router);
const mongoose = require('mongoose');

const connection = 'mongodb+srv://admin:admin@cluster0-byjrf.mongodb.net/backend?retryWrites=true';
mongoose.connect(connection, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;

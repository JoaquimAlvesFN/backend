const mongoose = require('mongoose');

//mongodb+srv://admin:<password>@cluster0-byjrf.mongodb.net/test?retryWrites=true

mongoose.connect('mongodb://admin:admin@cluster0-byjrf.mongodb.net/backend?retryWrites=true', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
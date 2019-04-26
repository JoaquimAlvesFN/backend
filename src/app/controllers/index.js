const Fs = require('fs');
const Path = require('path');

module.exports = app => {
    Fs
        .readdirSync(__dirname)
        .filter(file => ( (file.indexOf('.')) !== 0 && (file !== 'index.js') ) )
        .forEach(file => require(Path.resolve(__dirname, file))(app));
};
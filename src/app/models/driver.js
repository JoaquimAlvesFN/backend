const mongoose = require('../../database');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    cellphone: {
        type: Number,
        required: true,
    },
    car_id: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;
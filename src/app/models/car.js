const mongoose = require('../../database');

const CarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
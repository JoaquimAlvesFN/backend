const mongoose = require('../../database');

const RequestSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    client_id: {
        type: String,
    },
    driver_id: {
        type: String,
    },
    value: {
        type: Number,
    },
    payment_id: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
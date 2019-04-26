const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const PaymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;